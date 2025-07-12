# backend/scrape.py (FINAL VERSION)

from time import sleep
from app import create_app
from models.job import db, Job
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# --- Selenium Setup ---
print("Setting up Selenium WebDriver...")
service = ChromeService(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
driver.set_window_size(1920, 1080)
print("WebDriver setup complete.")

URL = "https://www.actuarylist.com/"

def scrape_actuary_list():
    print(f"Navigating to {URL}...")
    driver.get(URL)

    print("Scrolling down to trigger job list loading...")
    driver.execute_script("window.scrollTo(0, 800);")

    try:
        print("Waiting for job listings to appear...")
        # We wait for the first job card to be visible
        job_card_selector = "div[class*='Job_job-card__']" # Use a "contains" selector for robustness
        WebDriverWait(driver, 15).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, job_card_selector))
        )
        print("Job listings are visible.")
    except TimeoutException:
        print("Timeout: Job listings did not appear after scrolling. Exiting.")
        return

    # Handle the pop-up if it appears
    try:
        sleep(2)
        close_button_selector = "button[aria-label='Close']"
        close_button = driver.find_element(By.CSS_SELECTOR, close_button_selector)
        close_button.click()
        print("Pop-up closed.")
        sleep(1)
    except Exception:
        print("Pop-up not found or could not be closed, continuing...")

    # --- Scrape the job cards with the NEW selectors ---
    print("Finding job cards...")
    job_listings = driver.find_elements(By.CSS_SELECTOR, job_card_selector)
    print(f"Found {len(job_listings)} job listings.")

    if not job_listings:
        print("No job cards found. Exiting.")
        return

    scraped_jobs_count = 0
    app = create_app()
    with app.app_context():
        for job_card in job_listings:
            try:
                # Using the new, correct class names
                title = job_card.find_element(By.CSS_SELECTOR, "p[class*='Job_job-card__position']").text
                company = job_card.find_element(By.CSS_SELECTOR, "p[class*='Job_job-card__company']").text
                
                # Location can have multiple parts, so we get the container
                locations_div = job_card.find_element(By.CSS_SELECTOR, "div[class*='Job_job-card__locations']")
                location = locations_div.text.replace('\n', ' | ') # Example: 🇺🇸 USA | 💰 $97k-$159k | Boston MA
                
                posting_date = job_card.find_element(By.CSS_SELECTOR, "p[class*='Job_job-card__posted-on']").text
                
                tags_div = job_card.find_element(By.CSS_SELECTOR, "div[class*='Job_job-card__tags']")
                tags = tags_div.text.replace('\n', ', ') # Combine all tags into one string
                
                job_type = "Full-time" # Default value
                if "part-time" in tags.lower(): job_type = "Part-time"
                if "intern" in tags.lower(): job_type = "Internship"
                if "contract" in tags.lower(): job_type = "Contract"
                
                # Check for duplicates
                existing_job = Job.query.filter_by(title=title, company=company).first()
                if existing_job:
                    continue

                new_job = Job(title=title, company=company, location=location, posting_date=posting_date, job_type=job_type, tags=tags)
                db.session.add(new_job)
                scraped_jobs_count += 1
                print(f"  -> Prepared new job: {title}")

            except Exception as e:
                print(f"  -> Error processing a job card. Maybe its structure is different. Error: {e}")
                continue
        
        if scraped_jobs_count > 0:
            print(f"\nCommitting {scraped_jobs_count} new jobs to the database...")
            db.session.commit()
            print("Commit successful!")
        else:
            print("\nNo new jobs to add to the database.")

if __name__ == "__main__":
    scrape_actuary_list()
    driver.quit()
    print("\nScraping process finished.")
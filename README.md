# AlphaCareers - Full-Stack Job Board

**AlphaCareers** is a comprehensive, full-stack job board application designed for quantitative professionals in the fields of risk, data, and finance. This project was developed as a take-home assessment for a full-stack developer position. It features a complete CRUD API, a data scraper for populating the job board, and a polished, responsive React user interface.

**Live Demo Video:** https://drive.google.com/drive/folders/1gJKBqOaD6PiHXs5fIRBdY7kX6nk_BRRY

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Assumptions & Trade-offs](#assumptions--trade-offs)
- [Challenges & Solutions](#challenges--solutions)

---

## Project Overview

The core task was to build a full-stack web application that lists job postings. The project demonstrates a wide range of skills, including backend development with Flask, frontend development with React, database management with MySQL, and web scraping with Selenium. The application allows users to view, add, edit, delete, filter, and sort job listings in a modern and user-friendly interface.

## Features

-   **Dynamic Job Board:** Clean, responsive UI for browsing job listings.
-   **Full CRUD Functionality:** Users can Create, Read, Update, and Delete job postings through a seamless modal interface.
-   **Server-Side Filtering & Sorting:** Efficiently filter jobs by keyword, location, and job type. Sort results by date or company name.
-   **Interactive UI:**
    -   Hero landing page with an integrated search bar.
    -   Clickable job rows to view full details in a modal pop-up.
    -   "Show More" and "Show Less" pagination for a smooth browsing experience.
    -   Professional hover effects and a consistent, themed design.
-   **Automated Data Seeding:** A Selenium scraper pulls real job data from an external source to populate the database.
-   **User Feedback:** Toast notifications provide clear feedback for all user actions (add, update, delete).

## Tech Stack

-   **Backend:** Python, Flask, Flask-SQLAlchemy
-   **Frontend:** React.js, Material-UI (MUI) for components and styling
-   **Database:** MySQL
-   **Web Scraper:** Python, Selenium, webdriver-manager
-   **API Testing:** Postman
-   **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
-   **API Communication:** Axios

---

## System Architecture

The application is structured as a monorepo with three main components:

1.  **Backend (`/backend`):** A Flask-based REST API server that handles all business logic and database interactions. It exposes a set of endpoints for the frontend to consume.
2.  **Frontend (`/frontend`):** A single-page application (SPA) built with React. It communicates with the Flask backend via API calls to fetch and manipulate job data, providing a dynamic user experience.
3.  **Scraper (`/backend/scrape.py`):** A standalone Python script that uses Selenium to control a web browser, scrape job data from `actuarylist.com`, and populate the MySQL database directly.

---

## Setup and Installation

Follow these steps to set up and run the project on your local machine.

### Prerequisites

-   Python (3.10+)
-   Node.js & npm (18.0+)
-   A running MySQL server instance

### 1. Clone the Repository

```bash
git https://github.com/Mr-umer/project-bitbash
cd [YOUR_REPO_NAME]
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create and activate a Python virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install the required Python packages
pip install -r requirements.txt
```

### 3. Database Configuration

1.  Ensure your MySQL server is running.
2.  Create a new database. You can use a tool like MySQL Workbench and run:
    ```sql
    CREATE DATABASE job_board_db;
    ```
3.  In the `/backend` directory, create a file named `.env`.
4.  Copy the contents of `.env.example` into `.env` and update the `DATABASE_URL` with your MySQL credentials:
    ```
    # backend/.env
    DATABASE_URL="mysql+pymysql://YOUR_MYSQL_USER:YOUR_MYSQL_PASSWORD@localhost/job_board_db"
    ```
5.  Create the database tables by running the initialization script:
    ```bash
    # Make sure your virtual environment is active
    python init_db.py
    ```

### 4. Frontend Setup

```bash
# Navigate to the frontend directory from the project root
cd frontend

# Install the required npm packages
npm install
```

---

## Running the Application

You will need to have two terminals open to run both the backend and frontend servers simultaneously.

**Terminal 1: Start the Backend Server**

```bash
cd backend
venv\Scripts\activate
python app.py
```
The backend will be running at `http://127.0.0.1:5000`.

**Terminal 2: Start the Frontend Server**

```bash
cd frontend
npm start
```
The frontend application will automatically open in your browser at `http://localhost:3000`.

**Optional: Run the Scraper**

To populate the database with fresh data, run the scraper script from the `backend` directory.

```bash
# Make sure you are in the /backend directory with venv active
python scrape.py
```

---

## API Endpoints

The backend provides the following RESTful API endpoints:

| Method | Endpoint              | Description                                        |
| :----- | :-------------------- | :------------------------------------------------- |
| `GET`  | `/api/jobs`           | Get all jobs. Supports filtering and sorting.      |
| `POST` | `/api/jobs`           | Create a new job.                                  |
| `PUT`  | `/api/jobs/<id>`      | Update an existing job by its ID.                  |
| `DELETE`| `/api/jobs/<id>`    | Delete a job by its ID.                            |

---

## Assumptions & Trade-offs

-   **Date Sorting:** The `posting_date` is scraped as a relative string (e.g., "2d ago"). To implement a fast and reliable date sort under the project's time constraints, the "Newest First" and "Oldest First" options sort by the job's database ID. In a production environment, the next step would be to parse these strings into proper `DateTime` objects in the scraper for precise chronological sorting.
-   **Tags as String:** Tags are stored as a single comma-separated string in the database for simplicity. A more scalable production solution would use a many-to-many relationship with a separate `tags` table.
-   **No User Authentication:** As per the project scope, a user login/authentication system was not implemented.

---

## Challenges & Solutions

One of the main challenges was with the web scraper. The target website loads job content dynamically after the user scrolls down the page. Initially, the scraper found zero jobs.

**Solution:**
1.  The problem was diagnosed by pausing the Selenium browser and observing that the jobs were not present on the initial page load.
2.  The solution was to use `driver.execute_script("window.scrollTo(0, 800);")` to programmatically scroll the page.
3.  I then implemented an explicit wait (`WebDriverWait`) to pause the script until the job list container was visible, making the scraper robust against variable page load times. This ensured the scraper could reliably access the job data.

---

Thank you for the opportunity to work on this project!

**Umar Farooq**

# backend/init_db.py

print("Script started.")
print("Importing create_app and db...")
from app import create_app, db
print("Imports successful.")

print("Creating Flask app instance...")
app = create_app()
print("App instance created.")

# The 'app_context' is required for SQLAlchemy to know about the app's configuration
with app.app_context():
    print("Entered app_context. Attempting to connect to the database...")
    
    try:
        # A simple command to test the connection
        db.engine.connect()
        print("Database connection successful!")
        
        print("Attempting to drop all tables...")
        db.drop_all()
        print("Tables dropped.")
        
        print("Attempting to create all tables...")
        db.create_all()
        print("Tables created.")
        
        print("Database initialization complete.")

    except Exception as e:
        print("\n--- AN ERROR OCCURRED ---")
        print(f"Error: {e}")
        print("--------------------------\n")
        print("Please check the following:")
        print("1. Is your MySQL server running?")
        print("2. Is the database URL in your .env file correct? (Check host, user, password, db name)")
        print(f"   Current URL: {app.config.get('SQLALCHEMY_DATABASE_URI')}")
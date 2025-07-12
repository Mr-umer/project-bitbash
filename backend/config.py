import os
from dotenv import load_dotenv

# Find the absolute path of the directory containing this file
basedir = os.path.abspath(os.path.dirname(__file__))

# Load the .env file from that directory
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    """Set Flask configuration variables from .env file."""

    # General Config
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a_hard_to_guess_string'

    # Database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
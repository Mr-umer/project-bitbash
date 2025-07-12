# backend/models/job.py

from flask_sqlalchemy import SQLAlchemy

# This line creates the 'db' object that your other files need to import.
# This is the most important part.
db = SQLAlchemy()

class Job(db.Model):
    """Job Model"""
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    posting_date = db.Column(db.String(100))
    job_type = db.Column(db.String(100))
    tags = db.Column(db.Text)

    def to_dict(self):
        """Serializes the object to a dictionary."""
        return {
            'id': self.id,
            'title': self.title,
            'company': self.company,
            'location': self.location,
            'posting_date': self.posting_date,
            'job_type': self.job_type,
            'tags': self.tags
        }
# backend/routes/job_routes.py

from flask import Blueprint, request, jsonify
from models.job import db, Job
from sqlalchemy import or_
# Create a Blueprint
job_bp = Blueprint('job_bp', __name__)

# --- Helper Function ---
def validate_job_data(data, is_update=False):
    """Validates the job data from the request."""
    errors = {}
    required_fields = ['title', 'company', 'location']
    
    # For creation, all required fields must be present
    if not is_update:
        for field in required_fields:
            if not data.get(field):
                errors[field] = f"{field.capitalize()} is required."

    # Check for empty strings on fields that are present
    for field in required_fields:
        if field in data and not data.get(field):
             errors[field] = f"{field.capitalize()} cannot be empty."

    return errors

# --- API Endpoints ---

# [CREATE] Endpoint to add a new job
@job_bp.route('/jobs', methods=['POST'])
def add_job():
    data = request.get_json()

    # Validate incoming data
    errors = validate_job_data(data)
    if errors:
        return jsonify({"error": "Validation failed", "messages": errors}), 400

    # Create a new Job object
    new_job = Job(
        title=data['title'],
        company=data['company'],
        location=data['location'],
        posting_date=data.get('posting_date', 'N/A'), # .get() provides a default
        job_type=data.get('job_type', 'N/A'),
        tags=data.get('tags', '')
    )

    # Add to the database session and commit
    try:
        db.session.add(new_job)
        db.session.commit()
        return jsonify(new_job.to_dict()), 201 # 201 Created
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to add job to database", "details": str(e)}), 500


# [READ] Endpoint to get all jobs
# [READ] Endpoint to get all jobs with filtering and sorting
@job_bp.route('/jobs', methods=['GET'])
def get_jobs():
    try:
        query = Job.query

        search_term = request.args.get('search')
        job_type = request.args.get('job_type') # <-- Add this line

        if search_term:
            query = query.filter(
                or_(
                    Job.title.ilike(f"%{search_term}%"),
                    Job.company.ilike(f"%{search_term}%"),
                    Job.tags.ilike(f"%{search_term}%")
                )
            )
        
        if job_type: 
            query = query.filter(Job.job_type.ilike(f"%{job_type}%")) 
            
        search_term = request.args.get('search')
        if search_term:
            query = query.filter(
                or_(
                    Job.title.ilike(f"%{search_term}%"),
                    Job.company.ilike(f"%{search_term}%"),
                    Job.location.ilike(f"%{search_term}%"),
                    Job.tags.ilike(f"%{search_term}%")
                )
            )    
        # --- Filtering ---
        # Get filter parameters from the request URL (e.g., /api/jobs?location=Remote)
        job_type = request.args.get('job_type')
        location = request.args.get('location')
        
        if job_type:
            # Use 'ilike' for case-insensitive search
            query = query.filter(Job.job_type.ilike(f"%{job_type}%"))
        if location:
            query = query.filter(Job.location.ilike(f"%{location}%"))

        # --- Sorting ---
        # Get sort parameter (e.g., /api/jobs?sort=company_asc)
        sort_by = request.args.get('sort')
        if sort_by:
            if sort_by == 'company_asc':
                query = query.order_by(Job.company.asc())
            elif sort_by == 'company_desc':
                query = query.order_by(Job.company.desc())
            elif sort_by == 'date_asc':
                # Note: This sorts alphabetically on the date string. 
                # For true date sorting, the column should be a Date/DateTime type.
                # But for this project, this is sufficient.
                query = query.order_by(Job.id.asc()) # Oldest first
            elif sort_by == 'date_desc':
                query = query.order_by(Job.id.desc()) # Newest first (default)
        else:
            # Default sort order if no parameter is given
            query = query.order_by(Job.id.desc())

        jobs = query.all()
        return jsonify([job.to_dict() for job in jobs]), 200
        
    except Exception as e:
        return jsonify({"error": "Failed to retrieve jobs", "details": str(e)}), 500

# [UPDATE & DELETE] Endpoint to update or delete a specific job by ID
@job_bp.route('/jobs/<int:id>', methods=['PUT', 'DELETE'])
def manage_single_job(id):
    # Find the existing job in the database first for both methods
    job = Job.query.get(id)

    if job is None:
        return jsonify({"error": "Job not found"}), 404

    # --- Handle DELETE request ---
    if request.method == 'DELETE':
        try:
            db.session.delete(job)
            db.session.commit()
            return '', 204 # 204 No Content for successful deletion
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Failed to delete job", "details": str(e)}), 500

    # --- Handle PUT request ---
    if request.method == 'PUT':
        try:
            data = request.get_json()
            
           

            job.title = data.get('title', job.title)
            job.company = data.get('company', job.company)
            job.location = data.get('location', job.location)
            job.job_type = data.get('job_type', job.job_type)
            job.tags = data.get('tags', job.tags)
            
            db.session.commit()
            return jsonify(job.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Failed to update job", "details": str(e)}), 500
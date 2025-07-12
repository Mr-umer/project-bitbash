# backend/app.py

from flask import Flask
from flask_cors import CORS
from config import Config
from models.job import db
from routes.job_routes import job_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    CORS(app)

    app.register_blueprint(job_bp, url_prefix='/api')

    @app.route('/test')
    def test_route():
        return "<h1>Backend is alive!</h1>"

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
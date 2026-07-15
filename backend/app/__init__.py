from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_restful import Api
from flask_mail import Mail, Message
from .config import config_by_name
import os

db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    
    mail.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    api = Api(app)

    # Register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.shipment_routes import user_shipments_bp
    from app.routes.user_routes import user_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_shipments_bp, url_prefix='/api/user')
    app.register_blueprint(user_bp, url_prefix='/api')

    return app

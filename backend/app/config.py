import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwtsecretkey')
    UPLOAD_FOLDER = os.path.join('app/static', 'uploads')
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URI', 'sqlite:///courier.db')
    DEBUG = True
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = '8kellyodogwu@gmail.com'
    MAIL_PASSWORD = 'gpam smge leww pxdv'  # Use an App Password if using Gmail
    MAIL_DEFAULT_SENDER = '8kellyodogwu@gmail.com'
    

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    DEBUG = False

config_by_name = dict(
    development=DevelopmentConfig,
    production=ProductionConfig
)

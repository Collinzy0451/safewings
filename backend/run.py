from app import create_app, db
import os

app = create_app(os.getenv('FLASK_ENV') or 'development')

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0")

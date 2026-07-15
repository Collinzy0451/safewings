from app import create_app, db
import os
from app.models.user import User

app = create_app(os.getenv('FLASK_ENV') or 'development')

with app.app_context():
    db.drop_all()
    db.create_all()

    user = User.query.all()
    print(user)

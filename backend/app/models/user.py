from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(100), nullable=False)
    lname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=False, nullable=False)
    status = db.Column(db.String(50), default='active')
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='admin')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    profile_image = db.Column(db.String(255), nullable=True, default="default.png")

    shipments = db.relationship('Shipment', backref='user', cascade='all, delete-orphan', lazy=True)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'fname': self.fname,
            'lname': self.lname,
            'email': self.email,
            'phone': self.phone,
            'status': self.status,
            'role': self.role,
            'profile_image': self.profile_image,
            'created_at': self.created_at,
            'shipments': [shipment.to_dict() for shipment in self.shipments],
        }

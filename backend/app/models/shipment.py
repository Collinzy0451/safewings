from app import db
from datetime import datetime


# tracking_event.py or in the same models.py file
class TrackingEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    shipment_id = db.Column(db.Integer, db.ForeignKey('shipment.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    location = db.Column(db.String(255), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    completed = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "status": self.status,
            "description": self.description,
            "location": self.location,
            "timestamp": self.timestamp.isoformat(),
            "completed": self.completed
        }


# Now define Shipment after TrackingEvent
class Shipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tracking_number = db.Column(db.String(100), unique=True, nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), default='pending')
    cost = db.Column(db.Float, nullable=False)
    receiver_email = db.Column(db.String(100), nullable=False)
    receiver_name = db.Column(db.String(100), nullable=False)
    receiver_phone = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    delivery_date = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    events = db.relationship('TrackingEvent', backref='shipment', cascade='all, delete-orphan', lazy=True)


    def to_dict(self):
        return {
            "id": self.id,
            "tracking_number": self.tracking_number,
            "origin": self.origin,
            "destination": self.destination,
            "status": self.status,
            "cost": self.cost,
            "receiver_name": self.receiver_name,
            "receiver_phone": self.receiver_phone,
            "created_at": self.created_at,
            "delivery_date": self.delivery_date,
            "user_id": self.user_id,
            "receiver_email": self.receiver_email,
            "events": [event.to_dict() for event in self.events]
        }



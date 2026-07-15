from datetime import datetime
from flask import Blueprint, request, jsonify
from app import db
from app.models.shipment import Shipment, TrackingEvent
from app.models.user import User

user_shipments_bp = Blueprint('user_shipments_bp', __name__)





@user_shipments_bp.route('/tracking/<string:tracking_number>', methods=['GET'])
def track_shipment(tracking_number):
    try:
        shipment = Shipment.query.filter_by(tracking_number=tracking_number).first()
        if not shipment:
            return jsonify({"error": "Tracking number not found."}), 404
        return jsonify(shipment.to_dict()), 200
    except Exception as e:
        # You might want to log e here for debugging
        return jsonify({"error": "Internal server error"}), 500









@user_shipments_bp.route("/create/event/<int:shipment_id>", methods=["POST"])
def add_tracking_event(shipment_id):
    data = request.get_json()
    shipment = Shipment.query.get_or_404(shipment_id)

    event = TrackingEvent(
        shipment_id=shipment.id,
        status=data.get("status"),
        description=data.get("description"),
        location=data.get("location"),
        completed=data.get("completed", False)
    )

    db.session.add(event)

    # Optional: auto-update the shipment's current status
    shipment.status = event.status
    db.session.commit()

    return jsonify({"message": "Tracking event added", "event": event.to_dict()}), 201


# Get shipment details
@user_shipments_bp.route("/shipments/<int:shipment_id>", methods=["GET"])
def get_shipment_by_Id(shipment_id):
    shipment = Shipment.query.get_or_404(shipment_id)
    return jsonify(shipment.to_dict())

# Get all events for a shipment
@user_shipments_bp.route("/shipments/<int:shipment_id>/events", methods=["GET"])
def get_shipment_events(shipment_id):
    shipment = Shipment.query.get_or_404(shipment_id)
    events = TrackingEvent.query.filter_by(shipment_id=shipment.id).order_by(TrackingEvent.timestamp.desc()).all()
    events_list = [event.to_dict() for event in events]
    return jsonify(events_list)



@user_shipments_bp.route("/shipments/<int:shipment_id>/events/<int:event_id>", methods=["DELETE"])
def delete_tracking_event(shipment_id, event_id):
    # Confirm the shipment exists
    shipment = Shipment.query.get_or_404(shipment_id)

    # Look for the event by ID and make sure it belongs to this shipment
    event = TrackingEvent.query.filter_by(id=event_id, shipment_id=shipment.id).first()

    if not event:
        return jsonify({"error": "Tracking event not found for this shipment"}), 404

    # Delete the event
    db.session.delete(event)
    db.session.commit()

    return jsonify({"message": "Tracking event deleted successfully"}), 200




@user_shipments_bp.route("/event/<int:event_id>", methods=["GET"])
def get_single_event(event_id):
    event = TrackingEvent.query.get_or_404(event_id)
    return jsonify(event.to_dict()), 200



@user_shipments_bp.route("/update/event/<int:event_id>", methods=["PUT"])
def update_tracking_event(event_id):
    event = TrackingEvent.query.get_or_404(event_id)
    data = request.get_json()

    event.status = data.get("status", event.status)
    event.description = data.get("description", event.description)
    event.location = data.get("location", event.location)
    event.completed = data.get("completed", event.completed)

    db.session.commit()
    return jsonify({"message": "Event updated successfully", "event": event.to_dict()}), 200




# GET all shipments for a user
@user_shipments_bp.route('/shipments', methods=['GET'])
def get_all_shipments():
    shipments = Shipment.query.all()
    return jsonify([s.to_dict() for s in shipments]), 200


# GET all shipments for a user
@user_shipments_bp.route('/<int:user_id>/shipments', methods=['GET'])
def get_user_shipments(user_id):
    user = User.query.get_or_404(user_id)
    shipments = Shipment.query.filter_by(user_id=user.id).all()
    return jsonify([s.to_dict() for s in shipments]), 200


# GET a specific shipment for a user by tracking code
@user_shipments_bp.route('/<int:user_id>/shipment/<string:tracking_code>', methods=['GET'])
def get_single_user_shipment(user_id, tracking_code):
    user = User.query.get_or_404(user_id)
    shipment = Shipment.query.filter_by(user_id=user.id, tracking_number=tracking_code).first_or_404()
    return jsonify(shipment.to_dict()), 200




@user_shipments_bp.route("/<int:user_id>/shipment/<int:shipment_id>", methods=["GET"])
def get_shipment(user_id, shipment_id):
    shipment = Shipment.query.filter_by(id=shipment_id, user_id=user_id).first()
    
    if not shipment:
        return jsonify({"message": "Shipment not found"}), 404

    return jsonify({
        "id": shipment.id,
        "user_id": shipment.user_id,
        "tracking_number": shipment.tracking_number,
        "origin": shipment.origin,
        "destination": shipment.destination,
        "status": shipment.status,
        "cost": shipment.cost,
        "receiver_name": shipment.receiver_name,
        "receiver_email": shipment.receiver_email,
        "receiver_phone": shipment.receiver_phone,
        "created_at": shipment.created_at.strftime('%d/%m/%Y') if shipment.created_at else None,
        "delivery_date": shipment.delivery_date.strftime('%d/%m/%Y') if shipment.delivery_date else None,
    }), 200



@user_shipments_bp.route("/<int:user_id>/shipment/<int:shipment_id>", methods=["PUT"])
def update_shipment(user_id, shipment_id):
    shipment = Shipment.query.filter_by(id=shipment_id, user_id=user_id).first()

    if not shipment:
        return jsonify({"message": "Shipment not found"}), 404

    data = request.get_json()

    # Update fields if present in data
    shipment.tracking_number = data.get("tracking_number", shipment.tracking_number)
    shipment.origin = data.get("origin", shipment.origin)
    shipment.destination = data.get("destination", shipment.destination)
    shipment.status = data.get("status", shipment.status)
    shipment.cost = data.get("cost", shipment.cost)
    shipment.receiver_name = data.get("receiver_name", shipment.receiver_name)
    shipment.receiver_email = data.get("receiver_email", shipment.receiver_email)
    shipment.receiver_phone = data.get("receiver_phone", shipment.receiver_phone)

    
    if "delivery_date" in data:
        try:
            shipment.delivery_date = datetime.strptime(data["delivery_date"], "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"message": "Invalid date format. Use YYYY-MM-DD."}), 400
        
    if "created_at" in data:
        try:
            shipment.created_at = datetime.strptime(data["created_at"], "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"message": "Invalid created_at date format. Use YYYY-MM-DD."}), 400


    db.session.commit()

    return jsonify({"message": "Shipment updated successfully"}), 200



# CREATE a shipment for a user
@user_shipments_bp.route('/<int:user_id>/shipment', methods=['POST'])
def create_shipment_for_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    try:
        created_at = datetime.strptime(data['created_at'], "%d/%m/%Y") if 'created_at' in data else datetime.utcnow()
        delivery_date = datetime.strptime(data['delivery_date'], "%d/%m/%Y") if 'delivery_date' in data else None
    except ValueError:
        return jsonify({"error": "Invalid date format. Use DD/MM/YYYY."}), 400
    shipment = Shipment(
        tracking_number=data.get('tracking_number'),
        origin=data.get('origin'),
        destination=data.get('destination'),
        status=data.get('status', 'pending'),
        cost=data.get('cost'),
        receiver_name=data.get('receiver_name'),
        receiver_email=data.get('receiver_email'),
        receiver_phone=data.get('receiver_phone'),
        created_at=created_at,
        delivery_date=delivery_date,
        user_id=user.id
    )
    db.session.add(shipment)
    db.session.commit()
    return jsonify(shipment.to_dict()), 201



# UPDATE a user's shipment
@user_shipments_bp.route('/<int:user_id>/update/shipment/<int:shipment_id>', methods=['PUT'])
def update_user_shipment(user_id, shipment_id):
    user = User.query.get_or_404(user_id)
    shipment = Shipment.query.filter_by(id=shipment_id, user_id=user.id).first_or_404()
    data = request.get_json()

    try:
        created_at = datetime.strptime(data['created_at'], "%d/%m/%Y") if 'created_at' in data else shipment.created_at
        delivery_date = datetime.strptime(data['delivery_date'], "%d/%m/%Y") if 'delivery_date' in data else shipment.delivery_date
    except ValueError:
        return jsonify({"error": "Invalid date format. Use DD/MM/YYYY."}), 400

    shipment.tracking_number = data.get('tracking_number', shipment.tracking_number)
    shipment.origin = data.get('origin', shipment.origin)
    shipment.destination = data.get('destination', shipment.destination)
    shipment.status = data.get('status', shipment.status)

    # Ensure cost is a float
    if 'cost' in data:
        try:
            shipment.cost = float(data['cost'])
        except ValueError:
            return jsonify({"error": "Cost must be a number."}), 400

    shipment.receiver_name = data.get('receiver_name', shipment.receiver_name)
    shipment.receiver_email = data.get('receiver_email', shipment.receiver_email)
    shipment.receiver_phone = data.get('receiver_phone', shipment.receiver_phone)
    shipment.created_at = created_at
    shipment.delivery_date = delivery_date

    db.session.commit()
    return jsonify(shipment.to_dict()), 200



# DELETE a user's shipment
@user_shipments_bp.route('/<int:user_id>/delete/shipment/<int:shipment_id>', methods=['DELETE'])
def delete_user_shipment(user_id, shipment_id):
    user = User.query.get_or_404(user_id)
    shipment = Shipment.query.filter_by(id=shipment_id, user_id=user.id).first_or_404()
    db.session.delete(shipment)
    db.session.commit()
    return jsonify({'message': 'Shipment deleted'}), 200


@user_shipments_bp.route('/delete/shipment/<string:tracking_code>', methods=['DELETE'])
def delete_shipment_by_tracking_code(tracking_code):
    shipment = Shipment.query.filter_by(tracking_number=tracking_code).first_or_404()
    db.session.delete(shipment)
    db.session.commit()
    return jsonify({'message': 'Shipment deleted'}), 200

@user_shipments_bp.route('/delete/shipment/<int:shipment_id>', methods=['DELETE'])
def delete_shipment_by_id(shipment_id):
    shipment = Shipment.query.get_or_404(shipment_id)
    db.session.delete(shipment)
    db.session.commit()
    return jsonify({'message': 'Shipment deleted'}), 200


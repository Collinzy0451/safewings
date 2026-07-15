from flask import Blueprint, request, jsonify, current_app
from app.models.user import User
from app import db
from datetime import timedelta
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import exceptions as jwt_exceptions
import os
from werkzeug.utils import secure_filename
import uuid
from app.utils.image_helpers import save_image, delete_image


user_bp = Blueprint('user', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@user_bp.route('/user/update/<int:user_id>', methods=['PUT'])
# @jwt_required()

def update_user_profile_picture(user_id):
    user = User.query.get_or_404(user_id)
    data = request.form
    file = request.files.get('profile_image')

    user.fname = data.get('fname', user.fname)
    user.lname = data.get('lname', user.lname)
    user.phone = data.get('phone', user.phone)
    user.email = data.get('email', user.email)
    user.role = data.get('role', user.role)
    user.status = data.get('status', user.status)

    if file and allowed_file(file.filename):
        # Delete old image if exists
        delete_image(user.profile_image)

        # Save new image
        image_path = save_image(file, subfolder='profile_pictures')
        user.profile_image = image_path

    db.session.commit()
    return jsonify({'message': 'Profile updated', 'user': user.to_dict()})




@user_bp.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200


@user_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user.to_dict()), 200



@user_bp.route('/user/update/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json()
    new_email = data.get('email', user.email)
    new_fname = data.get('fname', user.fname)
    new_lname = data.get('lname', user.lname)
    new_phone = data.get('phone', user.phone)
    new_role = data.get('role', user.role)
    new_status = data.get('status', user.status)

    # Check if the new email is already used by another user
    existing_user = User.query.filter(User.email == new_email, User.id != user_id).first()
    if existing_user:
        return jsonify({'message': 'Email already in use by another user'}), 400

    # Update all fields
    user.email = new_email
    user.fname = new_fname
    user.lname = new_lname
    user.phone = new_phone
    user.role = new_role
    user.status = new_status

    db.session.commit()

    return jsonify(user.to_dict()), 200



@user_bp.route('/user/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200




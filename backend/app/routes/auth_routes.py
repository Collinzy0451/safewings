from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash
from app.models.user import User
from app import db, mail
from flask_mail import Message
from datetime import datetime, timedelta


auth_bp = Blueprint('auth', __name__)


# Mock OTP storage (in-memory dict)
otp_store = {}  # Format: { "user@example.com": {"otp": "123456", "expires_at": datetime }}

@auth_bp.route("/send-otp", methods=["POST"])
def send_otp():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"message": "Email is required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 400

    import random
    otp = str(random.randint(100000, 999999))
    expires_at = datetime.utcnow() + timedelta(minutes=5)  # OTP valid for 5 minutes

    otp_store[email] = {"otp": otp, "expires_at": expires_at}

    try:
        msg = Message("Your OTP Code", recipients=[email])
        
        msg.html = f"""
        <html>
        <head>
        <style>
            .email-container {{
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 30px;
            }}
            .email-box {{
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }}
            .otp {{
            font-size: 32px;
            color: #007BFF;
            margin: 20px 0;
            font-weight: bold;
            }}
            .footer {{
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            }}
        </style>
        </head>
        <body>
        <div class="email-container">
            <div class="email-box">
            <h2>Verify Your Email</h2>
            <p>Use the OTP below to verify your email address. It expires in 5 minutes:</p>
            <div class="otp">{otp}</div>
            <p>If you didn't request this code, you can ignore this message.</p>
            <div class="footer">© 2025 Marv World-Wide Delivery. All rights reserved.</div>
            </div>
        </div>
        </body>
        </html>
        """
        
        mail.send(msg)
        return jsonify({"message": "OTP sent to your email."}), 200

    except Exception as e:
        return jsonify({"message": "Failed to send OTP", "error": str(e)}), 500





@auth_bp.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json
    email = data.get("email")
    user_otp = data.get("otp")
    fname = data.get("fname")
    lname = data.get("lname")
    phone = data.get("phone")
    password = data.get("password")

    print(f"{fname}, {lname}, {phone}, {password}")

    if not email or not user_otp:
        return jsonify({"message": "Email and OTP are required"}), 400

    record = otp_store.get(email)
    if not record:
        return jsonify({"message": "OTP not found. Please request a new one."}), 400

    if datetime.utcnow() > record["expires_at"]:
        del otp_store[email]
        return jsonify({"message": "OTP has expired. Please request a new one."}), 400

    if record["otp"] != user_otp:
        return jsonify({"message": "Invalid OTP"}), 400


    hashed_password = generate_password_hash(password)

    new_user = User(
        fname=fname, 
        lname=lname, 
        email=email, 
        phone=phone,
        password_hash=hashed_password, 
        )

    db.session.add(new_user)
    db.session.commit()

    # OTP verified
    del otp_store[email]  # Optional: remove OTP after success
    return jsonify({"message": "User registered successfully"}), 200



@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({"message": "User not found, check your email and try again"}), 401

    elif not user.check_password(data['password']):
        return jsonify({"message": "Incorrect Password"}), 401




    access_token = create_access_token(
        identity={'id': user.id, 'role': user.role}, 
        expires_delta=timedelta(hours=3)
        )
    
    return jsonify({
        "access_token": access_token,
        "user": {
            "id": user.id,
            "fname": user.fname,
            "lname": user.lname,
            "email": user.email,
            "role": user.role,
            "phone": user.phone,
            "created_at": user.created_at
        }
    })

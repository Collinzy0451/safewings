import os
import uuid
from werkzeug.utils import secure_filename
from flask import current_app


def save_image(file, subfolder='profile_pictures'):
    """
    Save an uploaded image to the static/uploads/<subfolder> directory.

    Returns the relative path to the saved image (e.g., 'static/uploads/profile_pictures/abc.jpg')
    """
    if file:
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4().hex}_{filename}"

        upload_folder = os.path.join(current_app.root_path, 'static', 'uploads', subfolder)
        os.makedirs(upload_folder, exist_ok=True)

        filepath = os.path.join(upload_folder, unique_filename)
        file.save(filepath)

        # Return relative path for storing in DB and serving via /static
        return f'static/uploads/{subfolder}/{unique_filename}'

    return None


def delete_image(relative_path):
    """
    Deletes an image from the filesystem given its relative path (e.g., 'static/uploads/profile_pictures/abc.jpg')
    """
    if relative_path:
        full_path = os.path.join(current_app.root_path, relative_path)
        if os.path.exists(full_path):
            try:
                os.remove(full_path)
                return True
            except Exception as e:
                print(f"Error deleting image: {e}")
    return False

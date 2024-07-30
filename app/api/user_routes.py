from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms import EditUser

from aws_image_helpers import get_unique_image_filename, upload_file_to_s3
from sqlalchemy import select

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_profile(id):
    user = User.query.get(id)

    if not user:
        return {"error": "Incorrect user!"}
    
    form = EditUser()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        pfp = form.data['profile_pic']
        pfp.filename = get_unique_image_filename(pfp.filename)
        pfp_upload = upload_file_to_s3(pfp)

        user.pref_lang = form.data['pref_lang']
        user.profile_pic = pfp_upload['url']

        db.session.commit()
        return user.to_dict()
    
    return {"errors": form.errors}

    
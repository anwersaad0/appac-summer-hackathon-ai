from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Message, Conversation, db
from app.forms import EditMessage

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_message(id):
    message = Message.query.get(id)
    if not message:
        return {"error": "Could not find message!"}
    
    if message.user_id != current_user.id:
        return {"error": "You did not senf this message"}
    
    form = EditMessage()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        message.content = form.data['content']

        db.session.commit()
        return message.to_dict()
    
    return {"errors": form.errors}

#delete message route to be done later
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

from app.models import Message

class EditMessage(FlaskForm):
    content = StringField("Change your message here", validators=[DataRequired()])


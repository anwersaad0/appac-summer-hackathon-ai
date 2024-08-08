from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

from app.models import Message

class NewMessage(FlaskForm):
    content = StringField("Write a message here", validators=[DataRequired()])


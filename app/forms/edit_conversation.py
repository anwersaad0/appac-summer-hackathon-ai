from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class EditConversation(FlaskForm):
    name = StringField("Name of Conversation", validators=[DataRequired()])
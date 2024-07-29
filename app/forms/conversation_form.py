from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class NewConversation(FlaskForm):
    name = StringField("Name of Conversation", validators=[DataRequired()])
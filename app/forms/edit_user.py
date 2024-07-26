from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import User

class EditUser(FlaskForm):
    pref_lang = StringField("Change Preferred Language", validators=[DataRequired()])
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import User

from app.api.aws_image_helpers import ALLOWED_IMAGE_EXTENSIONS

class EditUser(FlaskForm):
    pref_lang = StringField("Change Preferred Language", validators=[DataRequired()])
    profile_pic = FileField("Change Profile Picture", validators=[FileRequired(), FileAllowed(list(ALLOWED_IMAGE_EXTENSIONS))])
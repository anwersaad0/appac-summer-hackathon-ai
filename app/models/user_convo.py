from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

user_convo = db.Table(
    'user_convo',
    db.Model.metadata,
    db.Column('user_id', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('convo_id', db.ForeignKey(add_prefix_for_prod('conversations.id')), primary_key=True),
)

if environment == "production":
    user_convo.schema = SCHEMA
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

class Message(db.Model):

    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    convo_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('conversations.id')))

    conversation = db.relationship("Conversation", back_populates='messages')
    sender = db.relationship("User", back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'createdAt': self.created_at,
            'userId': self.user_id,
            'convoId': self.convo_id,
        }
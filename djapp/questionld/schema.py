from ninja import Schema
from datetime import datetime


class UserSchema(Schema):
    id: int
    streak: int

class NotFoundSchema(Schema):
    message: str

class DailySchema(Schema):
    id: int
    user: int
    date: str
    content: str
    type: str

class ContentSchema(Schema):
    content: str
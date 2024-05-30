# python manage.py runserver

from ninja import NinjaAPI
from questionld.models import User, Daily
from questionld.schema import UserSchema, NotFoundSchema, DailySchema, ContentSchema

import random
import requests
from typing import List
from datetime import datetime
import os
from dotenv import load_dotenv

import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.environ.get('SECRET_KEY'))




api = NinjaAPI()

@api.get("/test")
def test(request):
    return {'test': 'success'}

@api.post("/new-user", response=UserSchema)
def create_user(request):
    while True:
        new_id = random.randint(100000000, 999999999)
        if not User.objects.filter(id=new_id).exists():
            break
    user = User.objects.create(id=new_id)
    return 200, user

@api.get("/user/{id}", response={200: UserSchema, 404: NotFoundSchema})
def get_user(request, id):
    try:
        user = User.objects.get(id=id)
        return 200, user
    except:
        return 404, {'message': 'Could not find user'}
    
@api.get("/today", response={200: List[DailySchema], 404: NotFoundSchema})
def get_today(request):
    try:
        user_id = request.headers['User']
        date = datetime.now().strftime("%Y-%m-%d")

        today = Daily.objects.filter(user=user_id, date=date).values()

        model = genai.GenerativeModel('gemini-1.0-pro')
        response = model.generate_content("Please give me python code to sort a list.")
        print(response.text)

        return today
    except:
        return 404, {'message': 'Could not find list'}
    
@api.post("/message", response={200: DailySchema, 404: NotFoundSchema})
def send_question(request, data: ContentSchema):
    try:
        user_id = request.headers['User']
        date = datetime.now().strftime("%Y-%m-%d")
        print(os.environ.get('SECRET_KEY'))
        if not User.objects.get(id=user_id):
            return 404, {'message': 'Could not find user'} 

        new_message = Daily.objects.create(user=user_id, date=date, content=data.content, type='user')


        return new_message
    except:
        return 404, {'message': 'Could not send message'}


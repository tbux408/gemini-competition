# python manage.py makemigrations
# python manage.py migrate 

# python manage.py ingest_user adds the values into database

from django.db import models

class Track(models.Model):
    title = models.CharField(max_length=250)
    artist = models.CharField(max_length=250)
    duration = models.FloatField()
    last_play = models.DateTimeField()

class User(models.Model):
    id = models.IntegerField(primary_key=True)
    streak = models.IntegerField(default=0)

# class Response(models.Model):
#     answer = models.CharField(max_length=200)
#     explanation = models.CharField(max_length=200)
#     finished = models.BooleanField(default=False)
#     hint = models.CharField(max_length=200)

class Daily(models.Model):
    id =  models.AutoField(primary_key=True)
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    user = models.IntegerField()
    date = models.CharField(max_length=200)
    content = models.CharField(max_length=200)
    type = models.CharField(max_length=200)
    # details = models.ForeignKey(Response, on_delete=models.CASCADE)

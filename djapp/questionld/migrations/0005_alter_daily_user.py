# Generated by Django 3.2.25 on 2024-05-30 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questionld', '0004_daily'),
    ]

    operations = [
        migrations.AlterField(
            model_name='daily',
            name='user',
            field=models.IntegerField(),
        ),
    ]
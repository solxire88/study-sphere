# Generated by Django 5.0.6 on 2025-05-23 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='class',
            name='difficulty',
            field=models.CharField(choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')], default='intermediate', max_length=50),
        ),
    ]

# Generated by Django 5.0.7 on 2024-10-07 14:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coding_contest_app', '0002_alter_contestdetails_contest_banner_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contestdetails',
            name='contest',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='details', serialize=False, to='coding_contest_app.contests'),
        ),
    ]

# Generated by Django 5.0.7 on 2024-10-11 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coding_contest_app', '0003_alter_contestdetails_contest'),
    ]

    operations = [
        migrations.AddField(
            model_name='contestdetails',
            name='contest_banner_image_name',
            field=models.TextField(blank=True, null=True),
        ),
    ]

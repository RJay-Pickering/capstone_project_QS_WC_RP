# Generated by Django 4.1.1 on 2022-10-31 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("application", "0002_alter_customer_username"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customer",
            name="username",
            field=models.CharField(
                blank="New_User_1953", default="New_User_1953", max_length=128
            ),
        ),
    ]

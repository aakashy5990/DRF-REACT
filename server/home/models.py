from django.db import models

# Create your models here.
class StudentModel(models.Model):

    COURSE_CHOICE = [
        ('BTECH','B.Tech'),
        ('BCA', 'BCA'),
        ('MCA', 'MCA'),
        ('MBA', 'MBA')
    ]

    GENDER_CHOICE = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    age = models.IntegerField(default=18)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICE)
    course = models.CharField(max_length=10, choices=COURSE_CHOICE)
    phone = models.CharField(max_length=17)
    address = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
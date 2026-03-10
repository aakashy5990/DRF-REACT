from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(StudentModel)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['name','email','age','gender','course','phone','address','is_active','create_at']
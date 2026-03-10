from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *

# Create your views here.

# for get the Request 
@api_view(['GET'])
def home(request):
    student_obj = StudentModel.objects.all()
    student_serializer = StudentSerializer(student_obj, many=True)
    return Response({'status':200,'payload':student_serializer.data})
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

@api_view(['POST'])
def student_post(request):
    data = request.data
    student_serializer = StudentSerializer(data = request.data)
    if not student_serializer.is_valid():
        return Response({'status':403, 'Errors':student_serializer.errors,'Message':'Something Went Wrong'})
    student_serializer.save()
    return Response({'status':200,'payload':data, 'message':'Data Successfully Posted'})


@api_view(['PUT','PATCH'])
def student_update(request,id):
    try:
        student_obj = StudentModel.objects.get(id = id)
        student_serializer = StudentSerializer(student_obj, data = request.data, partial=True)
        if not student_serializer.is_valid():
            return Response({'status':403, 'Errors':student_serializer.errors,'Message':'Something Went Wrong'})
        student_serializer.save()
        return Response({'status':200,'payload':student_serializer.data, 'message':'Data Successfully Updated'})
    
    except Exception as e:
        return Response({'status': 403, 'message' : 'invalid id'})

@api_view(['DELETE'])
def student_delete(request,id):
    try:
        student_obj = StudentModel.objects.get(id = id)
        student_obj.delete()
        return Response({'status':200, 'message':'Data Successfully Deleted'})
    
    except Exception as e:
        return Response({'status': 403, 'message' : 'invalid id'})
from telnetlib import STATUS
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser 
import json
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import *
from base.models import *


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    userr = request.user
    print(userr)
    udata = Note.objects.filter(user=userr.id)
    serializer = NoteSerializer(udata, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Upload(request):
    data = request.body.decode("utf-8")
    body=json.loads(data)
    for i in body:
        dataa={'user':request.user.id,'idd':i['id'],'userId':i['userId'],'title':i['title'],'body':i['body']}
        # user=request.user, idd=i['id'],userId=i['userId'],title=i['title'],body=i['body']
        serializer = NoteSerializer(data=dataa)
        if serializer.is_valid():
            print("hey")
            serializer.save()
        else:
            print(serializer.errors)
    # serializer = NoteSerializer(data=body[0],many=True)
    # if serializer.is_valid():
    #     serializer.save()
    #     return JsonResponse(serializer.data, status=STATUS.HTTP_201_CREATED) 
    # return JsonResponse(serializer.data, status=STATUS.HTTP_400_BAD_REQUEST)
    return JsonResponse({'user':'user'})



   

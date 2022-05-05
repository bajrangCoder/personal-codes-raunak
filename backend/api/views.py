from django.shortcuts import render, get_object_or_404
from api.serializers import PostSerializer, ContactSerializer, UserSerializer
from rest_framework.views import APIView      
from api.models import Post, User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('InvalidUser')

        if not user.check_password(password):
            raise AuthenticationFailed('WrongPass')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        #token.decode('utf-8')

        response = Response()

        #response.set_cookie(key='jwt', value=token, httponly=True,samesite='None',secure=True)
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):

    def get(self, request, token):
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response

class PostView(APIView):  
    def get(self,request,slug=None):
        if slug:
            queryset = Post.objects.filter(slug=slug).first()
            serializer = PostSerializer(queryset)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        queryset = Post.objects.filter(publish=True).order_by('-time_upload')
        serializer = PostSerializer(queryset,many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, slug=None):
        item = Post.objects.get(slug=slug)
        serializer = PostSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug=None):
        item = get_object_or_404(Post, slug=slug)
        item.delete()
        return Response({"status": "success"})

class AuthorPostView(APIView):
    def get(self,request,user):
        if user is not None:
            queryset = Post.objects.filter(author=user).order_by('-time_upload')
            serializer = PostSerializer(queryset,many=True)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response({"status": "error", "data": serializer.data}, status=status.HTTP_400_BAD_REQUEST)

class ContactView(APIView):
    def post(self,request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status":"success","data":serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({"status":"error","data":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
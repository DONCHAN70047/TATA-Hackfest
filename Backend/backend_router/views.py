import os
import json
import requests
from pprint import pprint
from backend_router import cloudinary
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.conf import settings
from django.core.mail import EmailMultiAlternatives

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR

# from .MLModel.MLapp import predict_disease

from PIL import Image
import cloudinary
import cloudinary.uploader







# ............................................................... CLOUDINARY ......................................
secure = os.getenv('SECURE')    
cloudinary.config( 
    cloud_name = "dzhuecgcu", 
    api_key = "328722844668938", 
    api_secret = "2d2IBDN8s9vNoJRgkylVOJNoSYI", 
    secure=True
)
# ............................................................... CLOUDINARY ......................................



# ............................................................... Mail Function ......................................
def MailFunction(userMail, userName, password):
    subject = 'Testing mail'
    from_email = settings.EMAIL_HOST_USER
    to_email = userMail
    text_content = 'This is a fallback plain text message.'
    html_content = f'<p><pre>Hi {userName}, thank you for signing up on UPOLABDHI!......... 🎉</pre> <pre>Your username: {userName}Y \our password: {password}....🔑</pre>  <pre>Please keep your credentials safe and do not share them with others........</pre>   <pre>Your registration was successful.....😊😊 — Welcome to UPOLABDHI!..... 😀😀</pre></p>'

    msg = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
# ............................................................... Mail Function ......................................


# ....................................................................... sign_in ............................................ 
@api_view(['POST'])
def sign_in(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        #print(username)
        

        if not username or not password or not email:
            return Response({"error": "Username, password, and email are required"}, status=HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        user.save()
        print('Save on Database...')

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        print(access_token)
        print(refresh_token)
        

        response = Response({
            "message": "User registered successfully",
            "access": access_token,
            "refresh": refresh_token,
        }, status=HTTP_201_CREATED)

        MailFunction(email, username, password)

        secure = False  
        response.set_cookie('access', access_token, httponly=True, secure=secure, samesite='Lax')
        response.set_cookie('refresh', refresh_token, httponly=True, secure=secure, samesite='Lax')

        return response

    except Exception as e:
        return Response({"error": str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)
# ....................................................................... sign_in ............................................  

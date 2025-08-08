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

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


# from .MLModel.MLapp import predict_disease

from PIL import Image
import cloudinary
import cloudinary.uploader

########## ML
import os
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_google_genai.embeddings import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from .MLModel import Model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
import asyncio
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from .MLModel.Model import create_vector_store_from_pdf



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

        #print(access_token)
        #print(refresh_token)
        

        response = Response({
            "message": "User registered successfully",
            "access": access_token,
            "refresh": refresh_token,
        }, status=HTTP_201_CREATED)

        #MailFunction(email, username, password)

        secure = False  
        response.set_cookie('access', access_token, httponly=True, secure=secure, samesite='Lax')
        response.set_cookie('refresh', refresh_token, httponly=True, secure=secure, samesite='Lax')

        return response

    except Exception as e:
        return Response({"error": str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)
# ....................................................................... sign_in ............................................  

# ....................................................................... current user ...............................................
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email, 
    })
# ....................................................................... current user ...............................................

# ....................................................................... Login ..........................................................
@api_view(['POST'])
@permission_classes([AllowAny])
def log_in(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password required"}, status=HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=HTTP_400_BAD_REQUEST)

    user = authenticate(username=user.username, password=password)
    if not user:
        return Response({"error": "Invalid credentials"}, status=HTTP_400_BAD_REQUEST)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    response = Response({
        "message": "Login successful",
        "access": access_token,
        "refresh": refresh_token,
        "username": user.username,  # ✅ Add this
        "email": user.email 
    }, status=HTTP_200_OK)

    # Optional: set cookies
    response.set_cookie('access', access_token, httponly=True, samesite='Lax')
    response.set_cookie('refresh', refresh_token, httponly=True, samesite='Lax')

    return response
# ....................................................................... Login ..........................................................




UPLOAD_DIR = "uploaded_pdfs"
VECTOR_STORE_DIR = r"vector_stores\Machine_Learning_Notes[1]"
#model = create_vector_store_from_pdf()

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(VECTOR_STORE_DIR, exist_ok=True)


@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_pdf(request):
    if 'pdf' not in request.FILES:
        return Response({"error": "No PDF file provided."}, status=status.HTTP_400_BAD_REQUEST)

    pdf_file = request.FILES['pdf']
    file_id = os.path.splitext(pdf_file.name)[0]  # safer than replace(".pdf", "")

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    os.makedirs(VECTOR_STORE_DIR, exist_ok=True)

    pdf_path = os.path.join(UPLOAD_DIR, pdf_file.name)
    with open(pdf_path, 'wb') as f:
        for chunk in pdf_file.chunks():  # safer for large files
            f.write(chunk)

    vector_store_path = os.path.join(VECTOR_STORE_DIR, file_id)

    try:
        Model.create_vector_store_from_pdf(pdf_path, vector_store_path)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    print('PDF uploaded.......')
    return Response({
        "message": "PDF uploaded and processed successfully.",
        "file_id": file_id
    }, status=status.HTTP_200_OK)



VECTOR_STORE_DIR = r"vector_stores/Machine_Learning_Notes[1]"
@api_view(['POST'])
def ask_question(request):
    file_id = request.data.get("file_id")
    question = request.data.get("question")

    #print("Received question:", question)

    if not file_id or not question:
        return Response({"error": "Both 'file_id' and 'question' are required."}, status=400)

    vector_store_path = os.path.join(VECTOR_STORE_DIR, file_id)

    if not os.path.exists(vector_store_path):
        return Response({"error": f"No vector store found for file_id: {file_id}"}, status=404)

    print("Vector Store Contents:", os.listdir(vector_store_path))

    try:
        # Direct function call (not async)
        response = Model.answer_question_from_store(question, vector_store_path)        
        return Response({"response": response})
    except Exception as e:
        print("Error while answering question:", str(e))
        return Response({"error": str(e)}, status=500)



@api_view(['POST'])
def ml_model_view(request):
    try:
        # your existing ML logic here
        return Response({'result': 'success'})
    except Exception as e:
        print("Error in MLModel view:", str(e))
        return Response({'error': str(e)}, status=500)



@csrf_exempt
def delete_vector_store_view(request):
    if request.method == 'POST':
        file_id = request.POST.get('file_id')
        if not file_id:
            return JsonResponse({"status": "error", "message": "Missing file_id"}, status=400)

        vector_store_path = os.path.join(VECTOR_STORE_DIR, file_id)
        try:
            if os.path.exists(vector_store_path):
                for file in os.listdir(vector_store_path):
                    os.remove(os.path.join(vector_store_path, file))
                os.rmdir(vector_store_path)
                return JsonResponse({"status": "success", "message": f"Deleted vector store for file ID: {file_id}"})
            else:
                return JsonResponse({"status": "error", "message": f"Vector store not found for {file_id}"}, status=404)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)
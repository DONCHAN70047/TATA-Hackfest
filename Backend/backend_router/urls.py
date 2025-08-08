from django.urls import path
from backend_router import views
from .views import log_in
from .views import upload_pdf  
from .views import ask_question
from .views import ml_model_view


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView
)

urlpatterns = [
    path('sign_in/', views.sign_in, name="sign_in"),
    path('log_in/', views.log_in, name="login"),
    # path('refresh/', views.refresh, name="refresh"),
    # path('blacklist/', views.blacklist, name="blacklist"),
    path('current_user/', views.current_user, name="current_user"),
    path('MLModel/', upload_pdf, name='upload_insurance_pdf'),
    path('MLModel/', ml_model_view),
    path('ask-question/', ask_question, name='ask_question'),

    #path('log_in/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #path('verify/', TokenVerifyView.as_view(), name='token_verify'),
    #path('blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    
]
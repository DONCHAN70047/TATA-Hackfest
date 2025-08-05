from django.urls import path
from backend_router import views



from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView
)

urlpatterns = [
    path('sign_in/', views.sign_in, name="sign_in"),
    #path('log_in/', views.login, name="login"),
    # path('refresh/', views.refresh, name="refresh"),
    # path('blacklist/', views.blacklist, name="blacklist"),
    #path('current_user/', views.current_user, name="current_user"),

    #path('log_in/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #path('verify/', TokenVerifyView.as_view(), name='token_verify'),
    #path('blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    
]
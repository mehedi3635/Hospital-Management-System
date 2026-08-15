from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    # Django Admin
    path(
        "admin/",
        admin.site.urls
    ),

    # API
    path(
        "api/",
        include("api.urls")
    ),

    # JWT Login
    path(
        "api/token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),

    # JWT Refresh
    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),
]
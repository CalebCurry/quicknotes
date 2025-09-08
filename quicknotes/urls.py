"""
URL configuration for quicknotes project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from quicknotes import views
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register('notes', views.NoteViewSet)
router.register('collections', views.CollectionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),

    # templated site
    path('notes/', include("quicknotes_site.urls")),

    # api
    #path('api/notes/', views.api_notes, name='api_notes')
    path('api/', include(router.urls)),

    # auth
    path('api/auth/login/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/auth/register/', views.register, name="register")
]

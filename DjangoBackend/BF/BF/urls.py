"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path, include
from carto.views import *
from django.urls import re_path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', InscriptionAPIView.as_view(), name="inscription"),
    path('ajout_exploitation/', AjouterExploitationAPIView.as_view(), name='ajout_exploitation'),
    path('ajout_parcelles/', save_parcelles, name='save_parcelles'),

    path('login-agriculteur/', AgriculteurLoginAPIView.as_view(), name='login-agriculteur'),

]
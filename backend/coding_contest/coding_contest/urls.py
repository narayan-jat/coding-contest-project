"""
URL configuration for coding_contest project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from coding_contest_app.views import google_signup


urlpatterns = [
    path('admin/', admin.site.urls),
    path('host/', include('coding_contest_app.urls.host_urls')),
    path('participant/', include('coding_contest_app.urls.participant_urls')),

    # Shravan's changes
    path('auth/registration/google/', google_signup, name='google_signup'),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/', include('allauth.urls')),
]

from django.urls import path

urlpatterns = [
    # ... other paths
    path('auth/registration/google/', google_signup, name='google_signup'),
]

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Contests
from .serializers import ContestsSerializer
from datetime import datetime
# Shravan's changes
from django.http import JsonResponse
from django.contrib.auth import get_user_model, authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
import requests


DRIVE_FOLDERS = {}

class AddContestDetailsView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        try:
            if 'start_date_time' in data:
                data['start_date_time'] = datetime.strptime(data['start_date_time'], '%a %b %d %Y %H:%M:%S GMT%z').isoformat()
            if 'end_date_time' in data:
                data['end_date_time'] = datetime.strptime(data['end_date_time'], '%a %b %d %Y %H:%M:%S GMT%z').isoformat()
        except ValueError as e:
            return Response({"error": f"Date format error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ContestsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContestDetailsView(APIView):

    def get(self, request, *args, **kwargs):
        contests = Contests.objects.all()
        
        if contests:
            serializer = ContestsSerializer(contests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"Message": "No data to show"}, status=status.HTTP_204_NO_CONTENT)

    def handle_method_not_allowed(self, request, *args, **kwargs):
        return Response({'error': 'Only GET method is allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(['POST'])
def google_signup(request):
    data = request.data
    token = data.get('token')

    # Verify the token with Google
    response = requests.get(f'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}')
    user_info = response.json()

    if response.status_code == 200:
        email = user_info.get('email')
        User = get_user_model()
        user, created = User.objects.get_or_create(email=email)
        
        if created:
            user.set_unusable_password()  # Google sign-in users won't have a password
            user.save()

        # Authenticate and login the user
        user = authenticate(request, username=email)
        if user is not None:
            login(request, user)
            
            # Generate or get an existing token for the user
            token, created = Token.objects.get_or_create(user=user)
            
            return JsonResponse({
                'message': 'User created or logged in successfully',
                'token': token.key
            })
        else:
            return JsonResponse({'error': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return JsonResponse({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
from rest_framework.generics import CreateAPIView
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import Exploitation
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.parsers import JSONParser
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import logout





# Create your views here.


class InscriptionAPIView(CreateAPIView):
    queryset = Agriculteur.objects.all()
    serializer_class = AgriculteurSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Enregistrez d'abord l'agriculteur
            agriculteur = serializer.save()

            # Créez un utilisateur associé à l'agriculteur
            username = request.data.get('email')  # Assurez-vous que le champ 'username' est présent dans votre sérialiseur
            password = request.data.get('password')  # Assurez-vous que le champ 'password' est présent dans votre sérialiseur
            email = request.data.get('email')  # Assurez-vous que le champ 'email' est présent dans votre sérialiseur
            
            user = User.objects.create_user(username=username, password=password, email=email)

            # Associez l'agriculteur à l'utilisateur
            agriculteur.user = user
            agriculteur.save()
            

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DeconnexionAPIView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'message': 'Vous êtes déconnecté.'}, status=status.HTTP_200_OK)

def check_authentication(request):
    print(request.user)
    isAuthenticated = request.user.is_authenticated
    return JsonResponse({'isAuthenticated': True})    

class AjouterExploitationAPIView(CreateAPIView):
    queryset = Exploitation.objects.all()
    serializer_class = ExploitationSerializer

    def perform_create(self, serializer): 
        # Récupérer l'agriculteur connecté
     if self.request.user.is_authenticated:
            
            

        agriculteur_connecte = self.request.user  # Assurez-vous que votre utilisateur est bien lié à Agriculteur


        # Remplir l'attribut Agriculteur avec l'agriculteur connecté
        serializer.save(Agriculteur=agriculteur_connecte)
        print (agriculteur_connecte)
     else :
         print("noooooooooooooooo")   
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def get_exploitations_by_agriculteur(request, agriculteur_id):
    try:
        exploitations = Exploitation.objects.filter(Agriculteur__id=agriculteur_id)
        exploitation_data = [{'nom': exp.nom, 'beefriendly': exp.beefriendly, 'surface': exp.surface} for exp in exploitations]
        return JsonResponse(exploitation_data, safe=False)
    except Exploitation.DoesNotExist:
        return JsonResponse([], safe=False)
    
    

class AgriculteurLoginAPIView(APIView):
    serializer_class = AgriculteurLoginSerializer
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(request, email=email, password=password)
        #user = authenticate(username="john", password="secret")
        
        print(f"Email: {email}")
        print(f"Password: {password}")
        
       

        
        CustomUser = get_user_model()

        if user is not None:
            # Log in the user
            login(request, user)
            print(self.request.user)
            request.session.save()  # Force la mise à jour de la session

            # Generate or get the authentication token
            token, created = Token.objects.get_or_create(user=user)
            print(user.id)
            user_data = {
                'user_id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                # Ajoutez d'autres champs au besoin
            }

            # Return the token or any other information you want
            return Response({'token': token.key, 'user_id': user.id}, status=status.HTTP_200_OK)
        
        
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
@csrf_exempt
@require_POST
def save_parcelles(request):
    try:
        data = JSONParser().parse(request)
        parcelle_data = data.get('parcelle', {})  # Extrait les données de la clé 'parcelle'

        # Assurez-vous que les clés nécessaires existent dans les données extraites
        if 'geometry' in parcelle_data and 'coordinates' in parcelle_data['geometry']:
            coordinates = parcelle_data['geometry']['coordinates']
            serializer = ParcelleSerializer(data={'coordinates': coordinates})

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'success': True, 'message': 'Parcelle enregistrée avec succès'})
            else:
                return JsonResponse({'success': False, 'message': serializer.errors})
        else:
            return JsonResponse({'success': False, 'message': 'Données de la parcelle incomplètes'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Erreur lors de l\'enregistrement de la parcelle : {str(e)}'})

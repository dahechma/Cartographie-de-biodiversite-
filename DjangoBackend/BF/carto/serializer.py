from rest_framework import serializers
from .models import Agriculteur 
from .models import Exploitation 
from django.contrib.auth import get_user_model
from .models import Parcelle




class AgriculteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agriculteur 
        fields=['name_structure','types','name','firstname','username','email','password']

           
class ExploitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exploitation
        fields = ( 'nom', 'surface','User')   
        
                
                

class AgriculteurLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Authenticate user
        user = get_user_model().objects.filter(email=email).first()
        if user and user.check_password(password):
            return data
        else:
            raise serializers.ValidationError("Invalid credentials")
        
        
class ParcelleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcelle
        fields = ['id', 'coordinates', 'Exploitation']        
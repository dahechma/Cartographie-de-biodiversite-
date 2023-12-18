from django.db import models
from django.contrib.auth.models import User








class Agriculteur(models.Model):
    name_structure = models.CharField(max_length=100)
    types = models.CharField(max_length=20, choices=[('individual', 'Exploitation individuelle'), ('collective', 'Exploitation collective')])
    name = models.CharField(max_length=30)
    firstname = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'



    

class Exploitation(models.Model):
    User = models.ForeignKey(User,null=True, on_delete=models.CASCADE)
    nom = models.CharField(max_length=100)
    beefriendly = models.BooleanField()
    surface = models.FloatField()


class Parcelle(models.Model):
    Exploitation = models.ForeignKey(Exploitation, on_delete=models.CASCADE, null=True)  # Utilisation d'AutoField pour générer automatiquement l'ID
    coordinates = models.JSONField()
   
    
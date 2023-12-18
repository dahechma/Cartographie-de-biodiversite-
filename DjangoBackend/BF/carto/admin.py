from django.contrib import admin

# Register your models here.
from .models import Agriculteur
from .models import Exploitation
 
# create a class for the admin-model integration
class AgriculteurAdmin(admin.ModelAdmin):
 
    # add the fields of the model here
    list_display = ("name_structure","types","name")
 
# we will need to register the
# model class and the Admin model class
# using the register() method
# of admin.site class
admin.site.register(Agriculteur)

class ExploitationAdmin(admin.ModelAdmin):
 
    # add the fields of the model here
    list_display = ("nom","beefriendly","surface")
 
# we will need to register the
# model class and the Admin model class
# using the register() method
# of admin.site class
admin.site.register(Exploitation,ExploitationAdmin)
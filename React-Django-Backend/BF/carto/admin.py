from django.contrib import admin
from .models import Agriculteur, Exploitation, Parcelle

@admin.register(Agriculteur)
class AgriculteurAdmin(admin.ModelAdmin):
    list_display = ('name_structure', 'types', 'name', 'firstname', 'email')
    search_fields = ('name_structure', 'name', 'firstname', 'email')

@admin.register(Exploitation)
class ExploitationAdmin(admin.ModelAdmin):
    list_display = ('User', 'nom', 'beefriendly', 'surface')
    search_fields = ('User__username', 'nom')
    list_filter = ('beefriendly',)

@admin.register(Parcelle)
class ParcelleAdmin(admin.ModelAdmin):
    list_display = ('Exploitation', 'coordinates')
    search_fields = ('Exploitation__nom',)

# Register any additional models here

    class Media:
        css = {
            'all': ('carto/css/admin_styles.css',)
        }
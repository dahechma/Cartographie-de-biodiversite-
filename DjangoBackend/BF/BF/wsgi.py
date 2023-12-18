import os
from django.core.wsgi import get_wsgi_application
# Supprimez la ligne suivante car elle n'est pas nécessaire
# from django.middleware import corsheaders

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BF.settings')

application = get_wsgi_application()
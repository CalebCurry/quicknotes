from django.contrib import admin
from .models import Note, Collection

admin.site.register(Note)
admin.site.register(Collection)
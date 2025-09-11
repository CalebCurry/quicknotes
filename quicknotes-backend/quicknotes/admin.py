from django.contrib import admin
from .models import Note, Collection

class CustomCollectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'id')
    readonly_fields = ('id',)

admin.site.register(Note)
admin.site.register(Collection, CustomCollectionAdmin)
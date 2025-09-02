from django.http import HttpResponse, JsonResponse

from quicknotes.serializers import NoteSerializer
from .models import Note
from rest_framework.viewsets import ModelViewSet

def home(request):
    return HttpResponse("Welcome Home!")

# def api_notes(request):
#     data = list(Note.objects.values())
#     return JsonResponse({'notes': data })

class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
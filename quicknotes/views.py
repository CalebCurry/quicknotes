from django.http import HttpResponse, JsonResponse
from .models import Note

def home(request):
    return HttpResponse("Welcome Home!")

def api_notes(request):
    data = list(Note.objects.values())
    return JsonResponse({'notes': data })
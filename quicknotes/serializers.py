from rest_framework.serializers import ModelSerializer
from quicknotes.models import Note

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content']
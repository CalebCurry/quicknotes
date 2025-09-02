from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from quicknotes.models import Note

class NoteSerializer(ModelSerializer):
    #content = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        model = Note
        fields = ['id', 'title', 'content']
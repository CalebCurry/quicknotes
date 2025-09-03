from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from quicknotes.models import Collection, Note

class NoteSerializer(ModelSerializer):
    #content = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        model = Note
        fields = "__all__"

class CollectionSerializer(ModelSerializer):

    class Meta:
        model = Collection
        fields = "__all__"
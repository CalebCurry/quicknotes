from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from quicknotes.models import Collection, Note

class CollectionSerializer(ModelSerializer):

    class Meta:
        model = Collection
        fields = "__all__"

class NoteSerializer(ModelSerializer):
    collection_data = CollectionSerializer(source="collection", read_only=True)

    class Meta:
        model = Note
        fields = "__all__"

class CollectionWithNotesSerializer(ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = "__all__"
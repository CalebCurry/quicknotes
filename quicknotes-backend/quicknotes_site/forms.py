from django.forms import ModelForm
from quicknotes.models import Note

class NoteForm(ModelForm):
    class Meta:
        model = Note
        fields = ['title', 'content']
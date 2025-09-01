from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.http import require_POST
from quicknotes.models import Note
from .forms import NoteForm

def notes(request):
    data = Note.objects.all()
    return render(request, 'quicknotes_site/notes.html', {'notes': data, 'form': NoteForm()})
    
def note(request, note_id):
    note = get_object_or_404(Note, pk=note_id)
    form = NoteForm(instance=note)
    return render(request, 'quicknotes_site/note.html', {'note': note, 'form': form})  

@require_POST
def add(request):
    form = NoteForm(request.POST)
    if form.is_valid():
        form.save()
    return redirect('notes')

@require_POST
def edit(request, note_id):
    note = get_object_or_404(Note, pk=note_id)
    form = NoteForm(request.POST, instance=note)
    if form.is_valid():
        form.save()
    return redirect('note', note_id=note_id)

@require_POST
def delete(request, note_id):
    note = get_object_or_404(Note, pk=note_id)
    note.delete()
    return redirect('notes')

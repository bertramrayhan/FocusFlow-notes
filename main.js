import {showNotesList, deleteNote, changeToEditView, saveEdit, getCurrentNoteId, openNote, setCurrentNoteId} from "./notes.js";

document.addEventListener('DOMContentLoaded', function(e){
    e.preventDefault();

    showNotesList();
});

document.getElementById('edit-btn').addEventListener('click', function(e){
    e.preventDefault();
    changeToEditView();
});

document.getElementById('delete-btn').addEventListener('click', function(e){
    e.preventDefault();
    deleteNote();
    openNote();
})

document.getElementById('edit-view-form').addEventListener('submit', function(e){
    e.preventDefault();
    
    saveEdit();
});

document.getElementById('cancel-btn').addEventListener('click', function(e){
    e.preventDefault();

    let notesList = JSON.parse(localStorage.getItem('notes')) || [];
    let currentNote = notesList.find(note => note.id === getCurrentNoteId());

    if(currentNote === undefined){
        openNote();
    }else {
        openNote(currentNote);
    }
});

document.getElementById('create-new-note-btn').addEventListener('click', function(e){
    e.preventDefault();

    const activeNoteItem = document.querySelector('.active');
    if (activeNoteItem) {
        activeNoteItem.classList.remove('active');
    }

    setCurrentNoteId('');
    changeToEditView();
});
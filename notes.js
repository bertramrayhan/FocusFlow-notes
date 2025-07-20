import { getIndonesianDateTime } from "./utils.js";

let currentNoteId = '';

export function getCurrentNoteId(){
    return currentNoteId;
}

export function setCurrentNoteId(noteId){
    currentNoteId = noteId;
}

export function showNotesList(){
    let notesList = JSON.parse(localStorage.getItem('notes')) || [];
    let divNotesList = document.getElementById('notes-list');
    divNotesList.innerHTML = '';

    notesList.sort((a, b) => b.timeOfChange - a.timeOfChange);

    for (const note of notesList) {
        const title = note.title;
        let content = note.content;
        if(note.content.length > 50){
            content = content.slice(0, 80) + '...';
        }
        const timeOfChange = getIndonesianDateTime(note.timeOfChange);

        let divNoteItem = document.createElement('div');
        divNoteItem.className = 'note-item';
        divNoteItem.dataset.id = note.id;
        
        if (note.id === currentNoteId) {
            divNoteItem.classList.add('active');
        }
        
        // Buat elements secara manual untuk avoid HTML injection
        let titleElement = document.createElement('h3');
        titleElement.textContent = title;
        
        let contentElement = document.createElement('p');
        contentElement.textContent = content;
        
        let timeElement = document.createElement('h5');
        timeElement.textContent = timeOfChange;
        
        divNoteItem.appendChild(titleElement);
        divNoteItem.appendChild(contentElement);
        divNoteItem.appendChild(timeElement);

        divNoteItem.addEventListener('click', function(e){
            e.preventDefault();
            
            const allNoteItems = document.querySelectorAll('.note-item');
            allNoteItems.forEach(item => item.classList.remove('active'));
            
            divNoteItem.classList.add('active');
            
            currentNoteId = note.id;
            openNote(note);
            console.log(currentNoteId);
        });

        divNotesList.appendChild(divNoteItem);
    }
}

export function openNote(note = null){
    let readTitle = document.getElementById('read-title');
    let readContent = document.getElementById('read-content');

    if(note === null){
        readTitle.textContent = '';
        readContent.textContent = '';
    }else{
        readTitle.textContent = note.title;
        readContent.textContent = note.content;
    }

    let readViewDiv = document.getElementById('read-view');
    let editViewDiv = document.getElementById('edit-view');

    editViewDiv.classList.add('hidden');
    readViewDiv.classList.remove('hidden');
}

export function deleteNote(){
    console.log('hapus');
    if (!currentNoteId) return;

    let noteItemDiv = document.querySelector(`[data-id="${currentNoteId}"]`)
    noteItemDiv.classList.add('delete');

    noteItemDiv.addEventListener('transitionend', () => {
        let notesList = JSON.parse(localStorage.getItem('notes')) || [];
        notesList = notesList.filter((note) => note.id !== currentNoteId);

        localStorage.setItem('notes', JSON.stringify(notesList));
        showNotesList();
    }, {once: true});
}

export function changeToEditView(){
    let titleInput = document.getElementById('title-input');
    let contentInput = document.getElementById('content-input');

    if(currentNoteId !== ''){
        const readTitle = document.getElementById('read-title').textContent;
        titleInput.value = readTitle;

        const readContent = document.getElementById('read-content').textContent;
        contentInput.value = readContent;
    }else {
        titleInput.value = '';
        contentInput.value = '';
    }

    let readViewDiv = document.getElementById('read-view');
    let editViewDiv = document.getElementById('edit-view');

    readViewDiv.classList.add('hidden');
    editViewDiv.classList.remove('hidden');
}

export function saveEdit(){
    let titleInput = document.getElementById('title-input').value.trim();
    let contentInput = document.getElementById('content-input').value.trim();
    if(titleInput === '' || contentInput === ''){
        return;
    }

    let updatedNotesList;
    let notesList = JSON.parse(localStorage.getItem('notes')) || [];
    let updatedNote = null;

    if(currentNoteId !== ''){
        updatedNotesList = notesList.map((note) => {
            if (note.id === currentNoteId){
                updatedNote = {
                    ...note,
                    title : titleInput,
                    content : contentInput,
                    timeOfChange : new Date().getTime()
                }

                return updatedNote;
            }

            return note;
        });
    }else {
        updatedNote = {
            id: 'note-' + new Date().getTime(),
            title: titleInput,
            content: contentInput,
            timeOfChange: new Date().getTime()
        }
        updatedNotesList = [...notesList, updatedNote];
        currentNoteId = updatedNote.id;
    }

    localStorage.setItem('notes', JSON.stringify(updatedNotesList));
    showNotesList();
    openNote(updatedNote);
}
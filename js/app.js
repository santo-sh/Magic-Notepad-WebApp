// console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a notes, add it to localstorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', (e) => {
    // console.log(e);
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    addTxt.value = "";
    showNotes();
});


// function to show elements from localstorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = '';

    notesObj.forEach(function(element, index) {
        html += `
        <div class="card col-md-4 col-lg-3 my-2 mx-2 noteCard" style="width: 15rem;">
                <div class="card-body">
                  <h5 class="card-title">Note ${index + 1}</h5>
                  <p class="card-text">${element}</p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note
                  </button>
                </div>
            </div>
        `;
    });
    let notesEle = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    } else {
        notesEle.innerHTML = `Nothing to Show use "Add a note" section above to add notes`;
    }
}

// function to delete a note
function deleteNote(index) {
    // console.log("I am deleting", index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}
let searchText = document.getElementById('searchText');
searchText.addEventListener('input', () => {
    let inputVal = searchText.value.toLowerCase;
    // console.log("Input Event fired", inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });

})
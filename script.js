const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");


let notes = [];


function render(notesToRender = notes) {
    notesList.textContent = "";

    notesToRender.forEach((note) => {
        const li = document.createElement("li");
        li.classList.add("note");
        li.classList.add(`category-${note.category}`);

        const category = document.createElement("span");
        category.classList.add("note-category");
        category.textContent = note.category;

        const text = document.createElement("p");
        text.classList.add("note-text");
        text.textContent = note.text;

        const date = document.createElement("small");
        date.classList.add("note-date");
        date.textContent = note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteNote(note.id);
        });

        li.appendChild(category);
        li.appendChild(text);
        li.appendChild(date);
        li.appendChild(deleteButton);

        notesList.appendChild(li);
    });

    updateCount(notesToRender);
}



function updateCount(notesToCount = notes) {
    if (notesToCount.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notesToCount.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notesToCount.length} notes.`;
    }
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    const category = categoryInput.value;

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString(),
    };

    notes.push(newNote);

    render();

    input.value = "";
    input.focus();
});


function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);

    render();
}
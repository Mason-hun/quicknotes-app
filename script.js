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

        li.appendChild(category);
        li.appendChild(text);
        li.appendChild(date);
        li.appendChild(deleteButton);

        notesList.appendChild(li);
    });

    updateCount();
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    const category = categoryInput.value;

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
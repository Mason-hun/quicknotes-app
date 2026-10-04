const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const category = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "quicknotes";

let notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function render() {
  notesList.textContent = "";

  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (filteredNotes.length === 0 && searchTerm !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  }

  filteredNotes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const text = document.createElement("p");
    text.textContent = note.text;

    const categoryLabel = document.createElement("small");
    categoryLabel.textContent = note.category;

    const date = document.createElement("small");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    li.appendChild(text);
    li.appendChild(categoryLabel);
    li.appendChild(date);
    li.appendChild(deleteButton);

    notesList.appendChild(li);
  });

  updateCount();
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function addNote(text, selectedCategory) {
  const cleanedText = text.trim();

  if (cleanedText === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (cleanedText.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  const newNote = {
    id: Date.now(),
    text: cleanedText,
    category: selectedCategory,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);

  saveNotes();
  render();

  errorMessage.textContent = "";
  input.value = "";
  input.focus();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);

  saveNotes();
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  addNote(input.value, category.value);
});

searchInput.addEventListener("input", () => {
  render();
});

render();
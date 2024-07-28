import { getData } from "./libs/fetch";
import {INote} from "./types/entity";
import Typed from "typed.js";

interface INoteResult {
    data: INote[];
}

const API_URL = "https://v1.appbackend.io/v1/rows/RFqKASAGdjkS";

async function renderNotes() {
    const notes = await getData<INoteResult>(API_URL);

    if (!notes) {
        console.log("eR0R GUY5");
        return;
    }

    notes.data.map((note) => {
        const newNote = document.createElement("div");
        newNote.classList.add("container");
        const newTitle = document.createElement("h1");
        const newContent = document.createElement("p");
        const dltBTN = document.createElement("button");
        dltBTN.classList.add("dlt-btn");
        dltBTN.textContent = "hapus";

        dltBTN.addEventListener("click", async () => {
          const id = note._id;
          try {
            await fetch(API_URL, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify([id]),
            });
          } catch (error) {
            console.log(error);
          } finally {
            window.location.reload();
          }
        })

        newTitle.textContent = note.title;
        newContent.textContent = note.content;

        newNote.append(newTitle);
        newNote.append(newContent);
        newNote.append(dltBTN);
        document.body.append(newNote);
    });
}

renderNotes();

const titleInput = document.getElementById("title") as HTMLInputElement;
const contentInput = document.getElementById("content") as HTMLInputElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;

addBtn.addEventListener("click", async () => {
    const title = titleInput.value;
    const content = contentInput.value;
    
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{title, content}])
        });    
    } catch (error) {
        console.log(error);
    } finally {
        window.location.reload();
    }
});

const typed = new Typed("#logo", {
  strings: ["こんにちは", "<i>Whats Your Creative Types?</i>"],
    typeSpeed: 100,
    loop: true,
    showCursor: false
});
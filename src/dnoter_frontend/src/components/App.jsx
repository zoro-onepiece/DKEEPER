import React, { useState, useEffect } from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Note from "./Note.jsx";
import initialNotes from "../notes.js";
import CreateArea from "./CreateArea.jsx";
// import uuid from "uuid";
import { v4 as uuidv4 } from "uuid";
import { createActor, canisterId } from "../../../declarations/dnoter_backend";



function App() {
  const [dnoterActor, setDnoterActor] = useState(null);
    const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function initActor() {
      try {
        const actor = await createActor(canisterId, {
          agentOptions: {
            host: "http://127.0.0.1:3000",
            shouldFetchRootKey: true,
          }
        }); // You’ll need to define `canisterId` or import it
        setDnoterActor(actor);
      } catch (error) {
        console.error("Failed to initialize actor:", error);
      }
    } initActor();
  }, []);




  async function addNote(newNote) {
    if (!dnoterActor) {
      console.error("Dnoter actor is not initialized.");
      return;
    }
    setNotes((prevNotes) => {
      dnoterActor.createNote(newNote.title, newNote.content)
      return [newNote , ...prevNotes]
    });
  }

  useEffect(() => {
    console.log("useEffect called");
 if (dnoterActor) {
    console.log("Actor methods:", Object.keys(dnoterActor)); // ✅ safe to log here
    fetchNotes();
  }
  }, [dnoterActor]);

  async function fetchNotes() {
    if (!dnoterActor) {
      console.error("Dnoter actor is not initialized.");
      return;
    } else {
      try {
        const fetchedNotes = await dnoterActor.readNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    }
  }

  function deleteNote(id) {if(!dnoterActor) {
    console.error("Dnoter actor is not initialized.");}
     dnoterActor.removeNote(id);
    setNotes((prevNotes) => {
      return prevNotes.filter((note, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />

      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;


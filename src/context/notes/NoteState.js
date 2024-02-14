import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // get all notes
  const getNote=async()=>{
    // api call to fetch all notes
    const response= await fetch(`${host}/api/notes/fetchAllNotes`,{
     method:'GET',
     headers:{
       'Content-Type': 'application/json',
       "auth-token": localStorage.getItem('token')
     }
   });
   const json=await response.json()
   console.log(json)
   setNotes(json)
  }

  // add a note
  const addNote=async(title, description, tag)=>{
   // api call to add the note
   const response= await fetch(`${host}/api/notes/addNotes`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body:JSON.stringify({title,description,tag})
  });
  const note=await response.json();
    setNotes(notes.concat(note))

  }

  // delete a note
  const deleteNote=async(id)=>{
     // api call to delete the note
  const response= await fetch(`${host}/api/notes/deleteNotes/${id}`,{
    method:'DELETE',
    headers:{
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    }
  });
  const json=await response.json();
  console.log(json)

    const newNotes= notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }

  

  // edit a note
  const editNote=async(id,title,description,tag)=>{
    // api call to update note
  const response= await fetch(`${host}/api/notes/updateNotes/${id}`,{
    method:'PUT',
    headers:{
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body:JSON.stringify({title,description,tag})
  });
  const json=await response.json();
  console.log(json)
  let newNotes=JSON.parse(JSON.stringify(notes))
    // logic to edit the note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id===id){
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }
      
    }
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

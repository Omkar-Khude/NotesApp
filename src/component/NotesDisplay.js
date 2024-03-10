import React, {useContext, useEffect, useRef, useState} from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../context/notes/NoteContext"
import {useNavigate } from "react-router-dom";
import "../fontStyle.css"
import backgroundImage from '../images/background2.png';


const NotesDisplay = (props) => {
    const context = useContext(NoteContext);
    const {notes, getNote, editNote} = context;
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
    const ref=useRef(null)
    const refClose=useRef(null)
    let navigate=useNavigate();

    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNote()
      }
      else{
        navigate('/login');
      }
      
      },[] )
      
      // logic to update the note
      const updateNote=(currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
      
      }
      const handleClick=(e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        props.showAlert("Note Updated Successfully","success") 
      }
  
      const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
   
      }
      const handleAddNotes=()=>{
        navigate('/home');
      }

  return (
    <>
    <div  style={{
     
     backgroundImage: `url('${backgroundImage}')`,
     backgroundSize: 'cover',
     backgroundPosition: 'center',
     minHeight: '93vh',
     overflow: 'hidden',
     
   }}>
    <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle"  name="etitle" aria-describedby="title" value={note.etitle} onChange={onChange} minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row">
    
      <h2 className="row h-100 fancy-title justify-content-center align-items-center" style={{ marginTop: '58px' }}>Your Notes</h2> 
      
      <div className="container mx-1 my-2">
      <button  onClick={handleAddNotes} className="btn btn-primary bg-dark  btn-lg">Add More +</button>
        {notes.length===0 && 'No notes to display'}
      </div>
            {notes.map((note)=>{
                 return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
            })}

    </div>
    </div>
    </>
  )
}

export default NotesDisplay

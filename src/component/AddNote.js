import React,{useContext} from 'react'
import {useState} from 'react'
import NoteContext from "../context/notes/NoteContext"
import "../fontStyle.css"
import {useNavigate } from "react-router-dom";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const {addNote} = context;
  const [note,setNote]=useState({title:"",description:"",tag:""})
  let navigate=useNavigate();
  // logic to handle the Add Note button click 
    const handleClick=(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note Added Successfully","success")
    }

    const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})

    }

    const handleNotes=()=>{
      navigate('/displaynotes');
    }
  return (
    <div>
           <div className="container my-5">
      <h2 className="fancy-title">Add a Note</h2>
      <form className="my-3">
  <div className="mb-3">
    <label htmlFor="title" className="form-label" style={{ fontSize: '20px'}}>Title</label>
    <input type="text" className="form-control form-control-lg" id="title"  name="title" aria-describedby="title" value={note.title} onChange={onChange} minLength={3} required style={{ width: '700px' }}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label" style={{ fontSize: '20px'}}>Description</label>
    <input type="text" className="form-control form-control-lg" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required style={{ width: '700px' }}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label" style={{ fontSize: '20px'}}>Tag</label>
    <input type="text" className="form-control form-control-lg" id="tag" name="tag" value={note.tag} onChange={onChange} style={{ width: '700px' }}/>
  </div>
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
<div className="container">
<div className="row justify-content-center">
<div className="col-auto"> 
<button  onClick={handleNotes} className="btn btn-primary bg-dark  btn-lg">Your Notes</button>
</div> 
  </div>
  </div>
  </div>
  )
}

export default AddNote

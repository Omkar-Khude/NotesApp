import React,{useContext} from 'react'
import {useState} from 'react'
import NoteContext from "../context/notes/NoteContext"

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const {addNote} = context;

  const [note,setNote]=useState({title:"",description:"",tag:""})
    
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
  return (
    <div>
           <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title"  name="title" aria-describedby="title" value={note.title} onChange={onChange} minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
  </div>
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
      
    </div>
  )
}

export default AddNote

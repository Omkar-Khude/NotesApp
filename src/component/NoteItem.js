import React,{useContext} from "react";
import NoteContext from "../context/notes/NoteContext"
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note,  updateNote } = props;


  return (
    <div className="col-md-2">
      <div className="card my-3" style={{ width: "15rem" }}>
        <div className="card-body">
        <span className="badge rounded-pill bg-danger"style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}>{note.tag}</span>
          <div className="d-flex align-items-center justify-content-between my-2" style={{ wordWrap: 'break-word' }}>
          <h5 className="card-title " style={{ maxWidth: '10rem', overflowWrap: 'break-word' }}>{note.title}</h5>
          <div className="d-flex">
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully","success")}}></i>
          <i className="far fa-edit mx-2"onClick={()=>{updateNote(note)}}></i>
          </div>
          </div>
          <p className="card-text" style={{maxWidth: '10rem', overflowWrap: 'break-word' }}>
          {note.description}
          </p>
          <p className="card-text">
            {new Date(note.date).toLocaleDateString("en-GB")} {/* Display date in dd/mm/yyyy format */}
        {' '}
        {new Date(note.date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})} {/* Display time in hh/mm/ss format */}
          </p>
          
        </div>
      </div>
    </div>
    
  );
};

export default NoteItem;

import React,{useRef, useState} from 'react'

const Profile = (props) => {
const host = "http://localhost:5000";
  const { user, setUser, showAlert } = props;
  const [editUser, setEditUser] = useState({ id: "", ename: "", eemail: "" });
  const ref = useRef(null);
  const refClose = useRef(null);

  // logic to update user
  const updateUser = (currentUser) => {
    ref.current.click();
    setEditUser({ id: currentUser._id, ename: currentUser.name, eemail: currentUser.email });
  }

  const onChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  }

  // api call to update the user
  const handleClick = async (e) => {
    try {
      const { id, ename, eemail } = editUser;
      const response = await fetch(`${host}/api/auth/updateUser/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ name: ename, email: eemail })
      });
      const json = await response.json();
      console.log(json);

      // Update user state with the new values
      setUser({ ...user, name: ename, email: eemail });

      // Close modal after update
      refClose.current.click();

      showAlert("User Updated Successfully", "success");
    } catch (error) {
      showAlert("Failed to Update User", "danger");
    }
  }
  return (
    <>  
    
 <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: 'white' }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" style={{ backgroundColor: 'white', color:'black' }} className="form-control" id="name" name="ename" aria-describedby="title" value={editUser.ename} minLength={3} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" style={{ backgroundColor: 'white', color:'black' }} className="form-control" id="email" name="eemail" aria-describedby="emailHelp" value={editUser.eemail} onChange={onChange} minLength={5} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={editUser.ename.length<3 || editUser.eemail.length<5} onClick={handleClick} className="btn btn-primary">Update User</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="card position-absolute" style={{ right: '20px', width: '17rem' }}>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between my-2" style={{ wordWrap: 'break-word' }}>
              <h5 className="card-title" style={{ maxWidth: '14rem', overflowWrap: 'break-word' }}>{user.name}</h5>
              <div className="d-flex" onClick={() => { updateUser(user) }}>
                <i className="far fa-edit"></i>
              </div>
            </div>
            <h6 className="card-subtitle mb-2 text-body-secondary" style={{ maxWidth: '14rem', overflowWrap: 'break-word' }}>{user.email}</h6>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile

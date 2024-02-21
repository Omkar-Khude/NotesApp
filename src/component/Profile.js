import React from 'react'

const Profile = () => {
  return (
    <div>
        <div className="card position-absolute" style={{ right: '20px',width: '17rem'}}>
  <div className="card-body">
    <div className="d-flex align-items-center justify-content-between my-2" style={{ wordWrap: 'break-word' }}>
    <h5 className="card-title" style={{ maxWidth: '14rem', overflowWrap: 'break-word' }}>Username username</h5>
    <div className="d-flex">
    <i className="far fa-edit"></i>
    </div>
    </div>
    <h6 className="card-subtitle mb-2 text-body-secondary"  style={{maxWidth: '14rem', overflowWrap: 'break-word' }}>username@email.com</h6>
    
  </div>
  
</div>

      
    </div>
  )
}

export default Profile

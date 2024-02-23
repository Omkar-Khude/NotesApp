import React,{useState,useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Navbar = (props) => {
  const host="http://localhost:5000"
  let navigate=useNavigate()
  const [showCard, setShowCard] = useState(false);

  // Api call to get user details
  const userInitial={}
  const [user, setUser] = useState(userInitial);
  useEffect(() => {
    if (localStorage.getItem('token')) {
    fetchUserDetails();
    }
  }, []);

    const fetchUserDetails=async()=> {
      try {
        const response = await fetch(`${host}/api/auth/fetchUserDetails`,{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        setUser(userData);
        
      } catch (error) {
        console.error('Error fetching user details:', error.message);
       
      }
    }
    
  const toggleCard = () => {
    setShowCard(!showCard);

  };

const handleLogout=()=>{
  localStorage.removeItem('token');
  navigate('/login')
  setUser({});
  props.showAlert("Logged Out Successfully","success") 
  }
  let location=useLocation();
  const shouldShowNavbar = location.pathname !== "/"; // Hide navbar on display page ("/")

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUserDetails();
    }
  }, [location.pathname]); // Fetch user details whenever location changes

  if (!shouldShowNavbar) {
    return null; // Render nothing if we are on the display page
  }



  return (
    <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary "data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          NotesApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/About"?"active":""}`} to="/About">
                About
              </Link>
            </li>
          </ul>
          {localStorage.getItem('token')?
          <form className="d-flex">
            <div>

<i className="fa fa-user fa-lg mx-4 text-white " style={{ fontWeight: 'normal' }} aria-hidden="true" onClick={toggleCard}><span className="mx-2" style={{fontSize: '1.5rem'}}>{user.name}</span></i>
{showCard && (
  <div className="position-absolute top-70 end-0 p-3 ">
<Profile user={user} setUser={setUser} showAlert={props.showAlert}/>
</div>
)}
<button  onClick={handleLogout} className="btn btn-primary bg-dark">Logout</button>
 
</div>
            
          </form>:null
  
}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

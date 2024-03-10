import React,{useState,useEffect} from 'react'
import backgroundImage from '../images/background2.png';
import AddNote from './AddNote';
import "../fontStyle.css"
const Home = (props) => {

  // Api call to get user details
  const host="http://localhost:5000"
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
    
  return (
    <div style={{
     
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '93vh',
      overflow: 'hidden',
      
    }}>
      <h2 className="fancy-title row justify-content-center align-items-center" style={{ marginTop: '58px' }}>Welcome {user.name} !</h2>
<AddNote showAlert={props.showAlert}/>
    </div>
    
  )
}

export default Home

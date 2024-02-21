import React from 'react'
import backgroundImage from '../images/background2.png';
import AddNote from './AddNote';
const Home = (props) => {
  return (
    <div style={{
     
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '93vh',
      overflow: 'hidden',
      
    }}>
<AddNote showAlert={props.showAlert}/>
    </div>
    
  )
}

export default Home

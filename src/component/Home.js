import React from 'react'
import Notes from './Notes'
import backgroundImage from '../images/background2.png';
const Home = (props) => {
  return (
    <div style={{
     
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '93vh',
      overflow: 'hidden',
      
    }}>
   
<Notes showAlert={props.showAlert}/>
    </div>
    
  )
}

export default Home

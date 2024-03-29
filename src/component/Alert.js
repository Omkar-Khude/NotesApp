import React from 'react'

function Alert(props) {

  // logic to capitalize the first letter of the alert type
  const capitalize=(word)=>{
    if(word==="danger"){
      word="error"
    }
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);

  }
  return (
    <div style={{height:"20px",
    position: 'absolute',
              // top: '60px', // Adjust this value according to your navbar height
              width: '100%',
              zIndex: '2',}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
  </div>}
  </div>
  )
}

export default Alert

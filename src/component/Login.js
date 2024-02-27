import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../fontStyle.css"
import backgroundImage from '../images/background1.jpeg';


const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  // logic to handle the form submit and login user api call
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged In Successfully", "success");
      navigate("/home");
    } else {
      props.showAlert("Invalid Credentials!", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSignUp=()=>{
    navigate('/signup') 
    }
  return (
    <div  style={{
     
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '93vh',
      overflow: 'hidden',
      
    }}>
      {/* <div className="container-fluid h-100 my-4"> */}
        <h2 className=" fancy-title row h-100 justify-content-center align-items-center my-5">
          Login to use NotesApp        </h2>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="card my-2">
              <div className="card-body">
                <h4 className="card-title text-center" style={{ fontSize: '28px', fontWeight: 'bold', color:'#302b2b'}}>Login</h4>

                <form className="my-3" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" style={{ fontSize: '20px'}}>
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={credentials.email}
                      name="email"
                      onChange={onChange}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                      style={{ fontSize: '20px'}}>
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={credentials.password}
                      name="password"
                      onChange={onChange}
                      id="exampleInputPassword1"
                      required
                    />
                  </div>
                  <button
                    disabled={
                      credentials.email.length < 1 ||
                      credentials.password.length < 1
                    }
                    type="submit"
                    className="btn btn-primary bg-dark "
                  >
                    Login
                  </button>
                  <div className="my-1">
  <h10 onClick={handleSignUp} style={{ cursor: 'pointer' }} >Dont't have an account? click here to create account.</h10>
  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Login;

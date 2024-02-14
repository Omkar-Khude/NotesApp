import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials!", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {/* <div className="container-fluid h-100 my-4"> */}
        <h2 className="row h-100 justify-content-center align-items-center my-2">
          Login to use iNotebook
        </h2>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="card my-4">
              <div className="card-body">
                <h4 className="card-title text-center">Login</h4>

                <form className="my-3" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
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
                    >
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
                    className="btn btn-primary"
                  >
                    Login
                  </button>
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

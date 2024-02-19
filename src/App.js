import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Alert from "./component/Alert";
import NoteState from "./context/notes/NoteState";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { useState } from "react";
import DisplayPage from "./component/DisplayPage";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message, type)=>{
    setAlert({
    msg:message,
    type:type
  })
  setTimeout(() => {
    setAlert(null);
  }, 1500);
}
  return (
    <BrowserRouter>
      <>
      <NoteState>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert}/>   
        {/* <DisplayPage/> */}
        <div>
        
        <Routes>
        <Route exact path="/" element={<DisplayPage/>}></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route exact path="/home" element={<Home showAlert={showAlert} />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
        </Routes>
        </div>
        </NoteState>
      </>
    </BrowserRouter>
  );
}

export default App;

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./pages/landing";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Todo from "./pages/todo";
import DeleteAccount from "./pages/deleteaccount";
function App() {
  //if token is stored then directly the todo page
  //if token is not stored then landing page 
  const token=localStorage.getItem('token');
  return (
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<Landing/>} ></Route>
          <Route path="/signup" element={<SignUp/>} ></Route>
          <Route path="/signin" element={<SignIn/>} ></Route>
          <Route path="/todo" element={<Todo/>} ></Route>
          <Route path="/deleteaccount" element={<DeleteAccount/>} ></Route>
      </Routes>
     </BrowserRouter>
  )
}

export default App

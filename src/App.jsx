import "./App.css";
import Docs from "./components/Docs";
import EditDocs from "./components/EditDocs";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/AuthDetails";
import { database } from "./firebaseConfig";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    // <>
    //   <SignIn />
    //   <SignUp />
    //   <AuthDetails />
    // </>

    <Routes>
      <Route path="/" element={<Docs database={database} />} />
      <Route path="/editDocs/:id" element={<EditDocs database={database} />} />
    </Routes>
  );
}

export default App;

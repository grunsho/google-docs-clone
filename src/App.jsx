import "./App.css";
import Docs from "./components/Docs";
import EditDocs from "./components/EditDocs";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { database } from "./firebaseConfig";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Docs database={database} />} />
      {/* <Route
          path="/editDocs/:id"
          element={<EditDocs database={database} />}
        /> */}
      <Route path="/auth/SignIn" element={<SignIn />} />
      <Route path="/auth/SignUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;

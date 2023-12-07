import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import WelcomePage from "./pages/WelcomePage";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const data = localStorage.getItem("User");
  const user = JSON.parse(data);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } 
  }, [user, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route exact={true} path="/" element={<Form />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;

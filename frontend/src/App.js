import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import WelcomePage from "./pages/WelcomePage";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
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

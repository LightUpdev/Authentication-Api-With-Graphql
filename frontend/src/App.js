import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import WelcomePage from "./pages/WelcomePage";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { LOGIN, SIGN_UP } from "./graphql/mutations";
import { useMutation } from "@apollo/client";

function App() {
  const data = localStorage.getItem("User");
  const user = JSON.parse(data);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [toggleLogin, setToggleLogin] = useState(true);
  const [isErrMsg, setIsErrMsg] = useState(false);
  const [error, setError] = useState("");
  const [passwordLength, setPasswordLength] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const [signUp] = useMutation(SIGN_UP);
  const [login] = useMutation(LOGIN);

  const signUpFunc = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password && username && phoneNumber) {
      try {
        const res = await signUp({
          variables: {
            firstName,
            lastName,
            email,
            password,
            username,
            phoneNumber,
          },
        });
        if (res?.data) {
          setLoading(true);
          localStorage.setItem("User", JSON.stringify(res?.data?.signUp));
          setEmail("");
          setFirstName("");
          setLastName("");
          setPassword("");
          setPhoneNumber("");
          setUsername("");
          setToggleLogin(!toggleLogin);
          setLoading(false);
        }
      } catch (err) {
        setIsErrMsg(true);
        setError(err.message);
        setLoading(false);
        setTimeout(() => {
          setIsErrMsg(false);
          setError("");
        }, 8000);
      }
    } else {
      setIsErrMsg(true);
      setError("Fields must be filled");
      setTimeout(() => {
        setIsErrMsg(false);
        setError("");
      }, 3000);
    }
  };

  const loginFunc = async (e) => {
    e.preventDefault();

    if (password && email) {
      setLoading(true);
      try {
        const res = await login({
          variables: { email, password },
        });

        if (res?.data) {
          localStorage.setItem("User", JSON.stringify(res?.data?.login));
          navigate("/welcome");
        }
        setEmail("");
        setPassword("");
        setLoading(false);
      } catch (err) {
        setIsErrMsg(true);

        setError(err.message);

        setTimeout(() => {
          setIsErrMsg(false);
          setError("");
        }, 3000);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    } else {
      setIsErrMsg(true);
      setError("Fields must be filled");
      setTimeout(() => {
        setIsErrMsg(false);
        setError("");
      }, 3000);
    }
  };

  const inputFormData = [
    {
      id: 1,
      inputName: "firstName",
      labelName: "firstName",
      label: "First Name",
      inputType: "text",
      required: true,
      value: firstName,
      onChange: (e) => {
        setFirstName(e.target.value);
      },
    },
    {
      id: 2,
      inputName: "lastName",
      labelName: "lastName",
      label: "Last Name",
      inputType: "text",
      required: true,
      value: lastName,
      onChange: (e) => {
        setLastName(e.target.value);
      },
    },
    {
      id: 3,
      inputName: "email",
      labelName: "email",
      inputType: "email",
      label: "Email",
      required: true,
      value: email,
      onChange: (e) => {
        setEmail(e.target.value);
      },
    },
    {
      id: 4,
      inputName: "password",
      labelName: "password",
      inputType: "password",
      label: "Password",
      required: true,
      value: password,
      onChange: (e) => {
        setPassword(e.target.value);
      },
    },
    {
      id: 5,
      inputName: "username",
      labelName: "username",
      inputType: "text",
      label: "Username",
      required: true,
      value: username,
      onChange: (e) => {
        setUsername(e.target.value);
      },
    },
    {
      id: 6,
      inputName: "phoneNumber",
      labelName: "phoneNumber",
      label: "Phone Number",
      inputType: "text",
      required: false,
      value: phoneNumber,
      onChange: (e) => {
        setPhoneNumber(e.target.value);
      },
    },
  ];

  const formProps = {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    username,
    toggleLogin,
    isErrMsg,
    error,
    passwordLength,
    hasSpecialChar,
    hasNumber,
    hasUppercase,
    inputFormData,
    loading,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setUsername,
    setPhoneNumber,
    setToggleLogin,
    setIsErrMsg,
    setError,
    setPasswordLength,
    setHasSpecialChar,
    setHasNumber,
    setHasUppercase,
    signUpFunc,
    loginFunc,
    setLoading,
  };

  const welcomePageProps = {
    menuToggle,
    setMenuToggle,
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route exact={true} path="/" element={<Form props={formProps} />} />
        <Route
          path="/welcome"
          element={<WelcomePage props={welcomePageProps} />}
        />
      </Routes>
    </div>
  );
}

export default App;

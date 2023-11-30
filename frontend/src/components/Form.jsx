import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import { useMutation } from "@apollo/client";
import { LOGIN, SIGN_UP } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [toggleLogin, setToggleLogin] = useState(true);

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

  const loginFormData = inputFormData.filter(
    (val) => val.inputName === "email" || val.inputName === "password"
  );

  const navigate = useNavigate();

  const [signUp] = useMutation(SIGN_UP);
  const [login] = useMutation(LOGIN);

  const signUpFunc = async (e) => {
    e.preventDefault();
    if ((firstName, lastName, email, password, username, phoneNumber)) {
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
          localStorage.setItem("User", JSON.stringify(res?.data?.signUp));
          setEmail("");
          setFirstName("");
          setLastName("");
          setPassword("");
          setPhoneNumber("");
          setUsername("");
          setToggleLogin(!toggleLogin);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const loginFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        variables: { email, password },
      });

      if (res?.data) {
        toast.success("You are successfully logged in");
        localStorage.setItem("User", JSON.stringify(res?.data?.login));
        navigate("/welcome");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="form-container">
        <div className="form-wrapper">
          <h2 className="app-header">
            {toggleLogin ? "Sign up to our App" : "Login your details"}
          </h2>
          <form>
            {toggleLogin ? (
              <>
                {inputFormData.map((formData) => {
                  const {
                    id,
                    inputName,
                    labelName,
                    inputType,
                    label,
                    required,
                    value,
                    onChange,
                  } = formData;
                  return (
                    <div className="input-field" key={id}>
                      <Label labelName={labelName} label={label} />
                      <Input
                        name={inputName}
                        inputType={inputType}
                        required={required}
                        value={value}
                        onChange={onChange}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {loginFormData.map((formData) => {
                  const {
                    id,
                    inputName,
                    inputType,
                    labelName,
                    label,
                    required,
                    value,
                    onChange,
                  } = formData;
                  return (
                    <div className="input-field" key={id}>
                      <Label labelName={labelName} label={label} />
                      <Input
                        name={inputName}
                        inputType={inputType}
                        required={required}
                        value={value}
                        onChange={onChange}
                      />
                    </div>
                  );
                })}
              </>
            )}

            <Button
              title={toggleLogin ? "Sign Up" : "Login"}
              onClick={toggleLogin ? signUpFunc : loginFunc}
            />
          </form>
          <div className="switch-auth">
            {toggleLogin ? (
              <small>
                Already have an account ?
                <span onClick={() => setToggleLogin(false)}>&nbsp; Login</span>
              </small>
            ) : (
              <small>
                Don't have an account ?
                <span onClick={() => setToggleLogin(true)}>
                  &nbsp; Register
                </span>
              </small>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;

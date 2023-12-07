import React, { useEffect, useState } from "react";
import Label from "./Label";
import Input from "./Input";
import { BsCheckCircle } from "react-icons/bs";
import Button from "./Button";
import { useMutation } from "@apollo/client";
import { LOGIN, SIGN_UP } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Form = () => {
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

  // CHECK IF PASSWORD HAVE SPECIAL CHARACTER
  useEffect(() => {
    const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!specialCharacters.test(password)) {
      setHasSpecialChar(false);
    } else {
      setHasSpecialChar(true);
    }
  }, [password]);

  // CHECK LENGTH OF PASSWORD
  useEffect(() => {
    if (password.length >= 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
  }, [password]);

  // CHECK IF PASSWORD HAVE NUMBER
  useEffect(() => {
    var numbers = /[0-9]/;

    if (numbers.test(password)) {
      setHasNumber(true);
    } else {
      setHasNumber(false);
    }
  }, [password]);

  // CHECK IF PASSWORD HAVE UPPERCASE
  useEffect(() => {
    var uppercase = /[A-Z]/;

    if (uppercase.test(password)) {
      setHasUppercase(true);
    } else {
      setHasUppercase(false);
    }
  }, [password]);

  // Form inputs
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
        setIsErrMsg(true);
        setError(err.message);
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
      try {
        const res = await login({
          variables: { email, password },
        });

        if (res?.data) {
          localStorage.setItem("User", JSON.stringify(res?.data?.login));
          navigate("/welcome");
        }
      } catch (err) {
        setIsErrMsg(true);
        setError(err.message);
        setTimeout(() => {
          setIsErrMsg(false);
          setError("");
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

  return (
    <>
      <div className="form-container">
        <motion.div
          whileInView={{ x: [150, 0], opacity: [0, 1] }}
          transition={{ duration: 2.5 }}
          className="form-div"
        >
          <div className="form-wrapper">
            <h2 className="app-header">
              {toggleLogin ? "Sign up with light-dev" : "Login your details"}
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
                        <Label
                          htmlFor={inputName}
                          labelName={labelName}
                          label={label}
                        />
                        <Input
                          id={inputName}
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
            <div className="err">
              <small>{isErrMsg && error}</small>
            </div>
            <div className="switch-auth">
              {toggleLogin ? (
                <small>
                  Already have an account ?
                  <span
                    onClick={() => {
                      setToggleLogin(false);
                      setEmail("");
                      setPassword("");
                    }}
                  >
                    &nbsp; Login
                  </span>
                </small>
              ) : (
                <small>
                  Don't have an account ?
                  <span
                    onClick={() => {
                      setToggleLogin(true);
                      setEmail("");
                      setPassword("");
                    }}
                  >
                    &nbsp; Register
                  </span>
                </small>
              )}
            </div>
          </div>
        </motion.div>
        {password.length > 0 && (
          <div className="validation-wrapper">
            <div>
              <small
                className={`mx-2 ${
                  passwordLength ? "font-success" : "font-danger"
                }`}
              >
                <BsCheckCircle
                  className={` ${
                    passwordLength ? "font-success" : "font-danger"
                  }`}
                />
                At least 8 characters
              </small>
              <small
                className={`mx-2 ${
                  hasSpecialChar ? "font-success" : "font-danger"
                }`}
              >
                <BsCheckCircle
                  className={` ${
                    hasSpecialChar ? "font-success" : "font-danger"
                  }`}
                />
                Has special characters
              </small>
            </div>
            <div>
              <small
                className={`mx-2 ${
                  hasUppercase ? "font-success" : "font-danger"
                }`}
              >
                <BsCheckCircle
                  className={` ${
                    hasUppercase ? "font-success" : "font-danger"
                  }`}
                />
                Has uppercase letter
              </small>
              <small
                className={`mx-2 ${hasNumber ? "font-success" : "font-danger"}`}
              >
                <BsCheckCircle
                  className={` ${hasNumber ? "font-success" : "font-danger"}`}
                />
                Has number characters
              </small>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Form;

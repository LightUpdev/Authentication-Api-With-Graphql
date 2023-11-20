import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";

const Form = ({ formTitle, formStatus, formAction }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [toggleLogin, setToggleLogin] = useState(true);

  const [signUp, SignUpResponse] = useMutation(SIGN_UP);

  console.log(SignUpResponse?.data?.signUp);

  const signUpFunc = async (e) => {
    e.preventDefault();
    await signUp({
      variables: { name, email, password, username, phoneNumber },
    });
    const user = SignUpResponse?.data?.signUp;

    localStorage.setItem("User", JSON.stringify(user));
    setEmail("");
    setName("");
    setPassword("");
    setPhoneNumber("");
    setUsername("");
  };

  const loginFunc = () => {};

  return (
    <>
      <div className="container">
        <div className="menu-action">
          <Button
            onClick={() => setToggleLogin(!toggleLogin)}
            title={`Switch to ${toggleLogin ? "Login" : "Sign up"}`}
          />
        </div>

        <h2 className="app-header">
          {toggleLogin ? "Sign up to our Application" : "Login your account"}
        </h2>
        <form>
          {toggleLogin ? (
            <>
              <Label labelName="name" label="Name" />
              <Input
                name="name"
                inputType="text"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Label labelName="email" label="Email" />
              <Input
                name="email"
                inputType="email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label labelName="name" label="Password" />
              <Input
                name="password"
                inputType="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Label labelName="username" label="Username" />
              <Input
                name="username"
                inputType="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Label labelName="phoneNumber" label="Phone Number" />
              <Input
                name="phoneNumber"
                inputType="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </>
          ) : (
            <>
              <Label labelName="email" label="Email" />
              <Input
                name="email"
                inputType="email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label labelName="name" label="Password" />
              <Input
                name="password"
                inputType="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          <Button
            title={toggleLogin ? "Sign Up" : "Login"}
            onClick={toggleLogin ? signUpFunc : loginFunc}
          />
        </form>
      </div>
    </>
  );
};

export default Form;

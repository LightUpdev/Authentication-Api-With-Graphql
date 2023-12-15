import React, { useEffect } from "react";
import Label from "./Label";
import Input from "./Input";
import { BsCheckCircle } from "react-icons/bs";
import Button from "./Button";
import { motion } from "framer-motion";

const Form = ({ props }) => {
  // CHECK IF PASSWORD HAVE SPECIAL CHARACTER
  useEffect(() => {
    // eslint-disable-next-line no-useless-escape
    const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!specialCharacters.test(props.password)) {
      props.setHasSpecialChar(false);
    } else {
      props.setHasSpecialChar(true);
    }
  }, [props.password, props]);

  // CHECK LENGTH OF PASSWORD
  useEffect(() => {
    if (props.password.length >= 8) {
      props.setPasswordLength(true);
    } else {
      props.setPasswordLength(false);
    }
  }, [props.password, props]);

  // CHECK IF PASSWORD HAVE NUMBER
  useEffect(() => {
    var numbers = /[0-9]/;

    if (numbers.test(props.password)) {
      props.setHasNumber(true);
    } else {
      props.setHasNumber(false);
    }
  }, [props.password, props]);

  // CHECK IF PASSWORD HAVE UPPERCASE
  useEffect(() => {
    var uppercase = /[A-Z]/;

    if (uppercase.test(props.password)) {
      props.setHasUppercase(true);
    } else {
      props.setHasUppercase(false);
    }
  }, [props.password, props]);

  const loginFormData = props.inputFormData.filter(
    (val) => val.inputName === "email" || val.inputName === "password"
  );

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
              {props.toggleLogin
                ? "Sign up with light-dev"
                : "Login your details"}
            </h2>
            <form>
              {props.toggleLogin ? (
                <>
                  {props.inputFormData.map((formData) => {
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
                title={props.toggleLogin ? `${props.loading ?"Loading...":"Sign Up"}` : `${props.loading ?"Loading...":"Login"}`}
                onClick={props.toggleLogin ? props.signUpFunc : props.loginFunc}
              />
            </form>
            <div className="err">
              <small>{props.isErrMsg && props.error}</small>
            </div>
            <div className="switch-auth">
              {props.toggleLogin ? (
                <small>
                  Already have an account ?
                  <span
                    onClick={() => {
                      props.setToggleLogin(false);
                      props.setEmail("");
                      props.setPassword("");
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
                      props.setToggleLogin(true);
                      props.setEmail("");
                      props.setPassword("");
                    }}
                  >
                    &nbsp; Register
                  </span>
                </small>
              )}
            </div>
            {props.password.length > 0 && (
          <div className="validation-wrapper">
            <div>
              <small
                className={`mx-2 ${
                  props.passwordLength ? "font-success" : "font-danger"
                }`}
              >
                <BsCheckCircle
                  className={` ${
                    props.passwordLength ? "font-success" : "font-danger"
                  }`}
                />
                At least 8 characters
              </small>
              <small
                className={`mx-2 ${
                  props.hasSpecialChar ? "font-success" : "font-danger"
                }`}
              >
                <BsCheckCircle
                  className={` ${
                    props.hasSpecialChar ? "font-success" : "font-danger"
                  }`}
                />
                Has special characters
              </small>
            </div>
            <div>
              <small
                className={`mx-2 ${
                  props.hasUppercase ? "font-success" : "font-danger"
                }`}
              >
                <BsCheckCircle
                  className={` ${
                    props.hasUppercase ? "font-success" : "font-danger"
                  }`}
                />
                Has uppercase letter
              </small>
              <small
                className={`mx-2 ${
                  props.hasNumber ? "font-success" : "font-danger"
                }`}
              >
                <BsCheckCircle
                  className={` ${
                    props.hasNumber ? "font-success" : "font-danger"
                  }`}
                />
                Has number characters
              </small>
            </div>
          </div>
        )}
          </div>
        </motion.div>
        
      </div>
    </>
  );
};

export default Form;

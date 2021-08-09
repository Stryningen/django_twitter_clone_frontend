import { useRef, useState } from "react";
import { END_POINTS, fetchApiAuth } from "../api";
import { useHistory } from "react-router-dom";

function SignUpPage() {
  const [errors, setErrors] = useState([]);
  const [ignorePasswordValidation, setIgnorePasswordValidation] =
    useState(false);

  const history = useHistory();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);
  const checkboxRef = useRef(null);

  const handleToggle = (e) => {
    if (checkboxRef.current === e.target) {
      setIgnorePasswordValidation(!ignorePasswordValidation);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const passwordTwo = password2Ref.current.value;

    if (password === null || password === "") {
      setErrors([["Password", "Password cannot be empty"]]);
      return;
    }

    if (password === passwordTwo) {
      const loaded_errors = [];
      const data = {
        username: username,
        password: password,
        ignore_password_validation: ignorePasswordValidation,
      };
      const response = await fetchApiAuth(data, END_POINTS.POST_USER_CREATE);
      console.log(response);
      if (response) {
        if (response.errors) {
          const errors = response.errors;
          if (errors.password) {
            errors.password.forEach((error) =>
              loaded_errors.push(["Password", error])
            );
          }
          if (errors.username) {
            errors.username.forEach((error) =>
              loaded_errors.push(["Username", error])
            );
          }
        }
        setErrors(loaded_errors);
        if (loaded_errors.length < 1) {
          history.push("/");
        }
        return;
      }
    }
    setErrors([["Password", "Confirm Password and Password must match"]]);
  };

  return (
    <main className="signup-page">
      <h2>Sign up and start chirping!</h2>
      <form className="form">
        <label htmlFor="username">Username:</label>
        <input ref={usernameRef} type="text" />
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="password" />
        <label htmlFor="password2">Confirm Password:</label>
        <input ref={password2Ref} type="password" />
        <div className="form-checkbox-wrapper">
          <label htmlFor="ignorePasswordValidation">
            Ignore password validation:
          </label>
          <input ref={checkboxRef} type="checkbox" onClick={handleToggle} />
        </div>
        {errors && (
          <ul className="login-errors-wrapper">
            {errors.map((error, index) => {
              return (
                <li key={index}>
                  <span>{error[0]}:</span> {error[1]}
                </li>
              );
            })}
          </ul>
        )}
        <button type="submit" onClick={handleSubmit}>
          Sign up
        </button>
      </form>
    </main>
  );
}

export default SignUpPage;

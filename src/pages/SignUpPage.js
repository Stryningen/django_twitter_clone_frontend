import { useRef, useState } from "react";
import { END_POINTS, fetchApiAuth } from "../api";

function SignUpPage() {
  const [errors, setErrors] = useState([]);
  const [ignorePasswordValidation, setIgnorePasswordValidation] =
    useState(false);

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

    console.log(ignorePasswordValidation);

    if (password === null || password === "") {
      setErrors([["Password", "Password cannot be empty"]]);
      return;
    }
    if (password === passwordTwo) {
      const errors = [];
      const data = {
        username: username,
        password: password,
        ignore_password_validation: ignorePasswordValidation,
      };
      const response = await fetchApiAuth(data, END_POINTS.POST_USER_CREATE);
      console.log(response);
      if (response.password) {
        response.password.forEach((error) => errors.push(["Password", error]));
      }
      if (response.username) {
        response.username.forEach((error) => errors.push(["Username", error]));
      }
      setErrors(errors);
      return;
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
              console.log(error);
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

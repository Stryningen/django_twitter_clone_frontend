import { useRef, useState } from "react";
import { END_POINTS, fetchApiAuth } from "../api";

function SignUpPage() {
  const [errors, setErrors] = useState([]);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    console.log(passwordRef.current.value);
    if (
      passwordRef.current.value === null ||
      passwordRef.current.value === ""
    ) {
      setErrors([["Password", "Password cannot be empty"]]);
      return;
    }
    if (passwordRef.current === password2Ref.current) {
      //const response = await fetchApiAuth(
      //{ username: usernameRef, password: passwordRef },
      //END_POINTS.POST_USER_CREATE
      //);
      //console.log(response);
      console.log("success");
      return;
    }
    setErrors([["Password", "Confirm password and Password must match"]]);
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

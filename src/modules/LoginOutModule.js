import { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { useAppContext } from "../context";
import { fetchApiAuth, LSTORAGE_TAGS } from "../api";

const LoginModule = (props) => {
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const usernameRef = useRef(false);
  const passwordRef = useRef(false);

  const storage = window.localStorage;

  const { setCurrentUser } = useAppContext();

  const { setShowLoginOutModule } = props;

  const handleLinkToSignup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLoginOutModule(false);
    history.push("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    let tmpErrors = [];
    const response = await fetchApiAuth({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
    if (!response) {
      return;
    }
    if (response.errors) {
      const errors = response.errors;
      if (errors.non_field_errors) {
        errors.non_field_errors.forEach((error) => {
          tmpErrors.push(["Failed", error]);
        });
      }
      if (errors.username) {
        errors.username.forEach((error) => {
          tmpErrors.push(["Username", error]);
        });
      }
      if (errors.password) {
        errors.password.forEach((error) => {
          tmpErrors.push(["Password", error]);
        });
      }
      setErrors(tmpErrors);
    }
    if (response.result) {
      const result = response.result;

      if (!result.token) {
        return;
      }
      storage.setItem(LSTORAGE_TAGS.USERNAME, response.result.username);
      storage.setItem(LSTORAGE_TAGS.TOKEN, response.result.token);
      storage.setItem(LSTORAGE_TAGS.ID, response.result.id);
      setCurrentUser(true);
      setShowLoginOutModule(false);
      history.push("/");
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form className="login-form">
        <label htmlFor="username">Username:</label>
        <input ref={usernameRef} type="text" name="username" />
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="password" name="password" />
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
        <button onClick={handleLogin}>Login</button>
      </form>
      <Link onClick={handleLinkToSignup} className="sign-up-link" to="/signup">
        Do not have an account? Click here to Sign Up!
      </Link>
    </>
  );
};

const LogoutModule = (props) => {
  const { setShowLoginOutModule } = props;
  const storage = window.localStorage;

  const { setCurrentUser } = useAppContext();

  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    storage.removeItem(LSTORAGE_TAGS.USERNAME);
    storage.removeItem(LSTORAGE_TAGS.TOKEN);
    storage.removeItem(LSTORAGE_TAGS.ID);
    setCurrentUser(false);
    setShowLoginOutModule(false);
    history.push("/");
  };
  return (
    <>
      <h2>Logout</h2>
      <p>
        You are logged in as <b>{storage.getItem(LSTORAGE_TAGS.USERNAME)}</b>,
        do you wish to logout?
      </p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

function LoginOutModule(props) {
  const { currentUser } = useAppContext();
  const { setShowLoginOutModule } = props;
  const closeModuleBtnRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleCloseModule = (e) => {
    e.preventDefault();
    if (
      e.target === wrapperRef.current ||
      e.target === closeModuleBtnRef.current
    ) {
      setShowLoginOutModule(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="module-wrapper"
      onClick={handleCloseModule}
    >
      <aside className="module">
        {currentUser ? (
          <LogoutModule setShowLoginOutModule={setShowLoginOutModule} />
        ) : (
          <LoginModule setShowLoginOutModule={setShowLoginOutModule} />
        )}
        <button
          ref={closeModuleBtnRef}
          onClick={handleCloseModule}
          className="close-module-btn"
        >
          X
        </button>
      </aside>
    </div>
  );
}

export default LoginOutModule;

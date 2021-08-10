import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context";
import { LSTORAGE_TAGS } from "../api";

function MenuModule(props) {
  const { showMenuModule, setShowMenuModule, setShowLoginOutModule } = props;
  const wrapperRef = useRef(null);
  const closeModuleBtnRef = useRef(null);

  const storage = window.localStorage;
  const id = storage.getItem(LSTORAGE_TAGS.ID);

  const { currentUser } = useAppContext();

  const handleCloseModule = (e) => {
    e.preventDefault();
    if (
      e.target === wrapperRef.current ||
      e.target === closeModuleBtnRef.current
    ) {
      setShowMenuModule(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      onClick={handleCloseModule}
      className={`module-wrapper ${!showMenuModule && "hide-module-wrapper"}`}
    >
      <aside
        className={`module left-module ${showMenuModule && "left-module-open"}`}
      >
        <h2>Menu</h2>
        <nav>
          {!currentUser && (
            <Link onClick={() => setShowMenuModule(false)} to="/signup">
              Sign up
            </Link>
          )}
          {currentUser && (
            <Link
              onClick={() => setShowMenuModule(false)}
              to={`/profilepage/${id}`}
            >
              Profile
            </Link>
          )}
          <Link onClick={() => setShowMenuModule(false)} to="/">
            Follow new chirpers
          </Link>
        </nav>
        <button
          onClick={() => {
            setShowMenuModule(false);
            setShowLoginOutModule(true);
          }}
        >
          {currentUser ? "Logout" : "Login"}
        </button>
        <button ref={closeModuleBtnRef} onClick={handleCloseModule}>
          Close
        </button>
      </aside>
    </div>
  );
}

export default MenuModule;

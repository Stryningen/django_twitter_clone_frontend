import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context";

function MenuModule(props) {
  const { showMenuModule, setShowMenuModule, setShowLoginOutModule } = props;
  const wrapperRef = useRef(null);
  const closeModuleBtnRef = useRef(null);
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
      <nav
        className={`module left-module ${showMenuModule && "left-module-open"}`}
      >
        <h2>Menu</h2>
        <nav>
          {!currentUser && (
            <Link onClick={() => setShowMenuModule(false)} to="/signup">
              Sign up
            </Link>
          )}
          <Link onClick={() => setShowMenuModule(false)} to="/">
            Profile
          </Link>
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
      </nav>
    </div>
  );
}

export default MenuModule;

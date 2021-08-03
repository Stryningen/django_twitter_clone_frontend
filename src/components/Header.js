import { useAppContext } from "../context";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LSTORAGE_TAGS } from "../api";

const MIN_WINDOW_SIZE = 700;

function Header(props) {
  const { currentUser } = useAppContext();
  const { setShowLoginOutModule, setShowMenuModule } = props;

  const storage = window.localStorage;
  const id = storage.getItem(LSTORAGE_TAGS.ID);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const checkSize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleOpenModule = (e) => {
    e.preventDefault();
    setShowLoginOutModule(true);
  };

  const handleOpenMenuModule = (e) => {
    e.preventDefault();
    setShowMenuModule(true);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    if (windowWidth >= MIN_WINDOW_SIZE) {
      setShowMenuModule(false);
    }
    return () => window.removeEventListener("resize", checkSize);
  }, [checkSize]);
  return (
    <header>
      {windowWidth <= MIN_WINDOW_SIZE && (
        <button className="menu-header-button" onClick={handleOpenMenuModule}>
          Menu
        </button>
      )}
      <h2 className={`${windowWidth < MIN_WINDOW_SIZE && "center-h2-header"}`}>
        <Link to="/">Chirp</Link>
      </h2>
      {windowWidth > MIN_WINDOW_SIZE && (
        <nav>
          {!currentUser && <Link to="/signup">Sign up</Link>}
          {currentUser && <Link to={`/profilepage/${id}`}>Profile</Link>}{" "}
          <Link to="/">Follow new chirpers</Link>
        </nav>
      )}
      {windowWidth > MIN_WINDOW_SIZE && (
        <button onClick={handleOpenModule}>
          {currentUser ? "Logout" : "Login"}
        </button>
      )}
    </header>
  );
}

export default Header;

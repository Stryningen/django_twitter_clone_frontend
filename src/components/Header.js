import { useAppContext } from "../context";

import { Link } from "react-router-dom";

function Header(props) {
  const { currentUser } = useAppContext();
  const { setShowLoginOutModule } = props;
  const handleOpenModule = (e) => {
    e.preventDefault();
    setShowLoginOutModule(true);
  };
  return (
    <header>
      <h2>
        <Link to="/">Chirp</Link>
      </h2>
      <Link to="/signup">Sign up</Link>
      <Link to="/">Link 2</Link>
      <Link to="/">Link 3</Link>
      <button onClick={handleOpenModule}>
        {currentUser ? "Logout" : "Login"}
      </button>
    </header>
  );
}

export default Header;

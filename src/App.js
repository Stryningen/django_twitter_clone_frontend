import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ChirpDetailView from "./pages/ChirpDetailView";
import LoginOutModule from "./modules/LoginOutModule";
import MenuModule from "./modules/MenuModule";
import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./resources/css/main.css";

function App() {
  const [showLoginOutModule, setShowLoginOutModule] = useState(false);
  const [showMenuModule, setShowMenuModule] = useState(false);
  return (
    <Router>
      <div className="App">
        <Header
          setShowLoginOutModule={setShowLoginOutModule}
          setShowMenuModule={setShowMenuModule}
        />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/detailview/:id" component={ChirpDetailView} />
        {showLoginOutModule && (
          <LoginOutModule setShowLoginOutModule={setShowLoginOutModule} />
        )}
        <MenuModule
          setShowLoginOutModule={setShowLoginOutModule}
          setShowMenuModule={setShowMenuModule}
          showMenuModule={showMenuModule}
        />
      </div>
    </Router>
  );
}

export default App;

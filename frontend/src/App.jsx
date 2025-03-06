import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/WelcomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/DashaBoard";
import AddLicense from "./pages/AddLicense";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />{/* Unique user dashboards */}
        <Route path="/addlicense" element={<AddLicense />} />
        <Route path="/Home" element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;

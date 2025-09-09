import React, { useState } from "react";
import LoginScreen from "../components/desktop/LoginScreen";
import DesktopUI from "../components/desktop/DesktopUI";

export default function Desktop() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="w-full h-screen bg-black">
      {currentUser ? (
        <DesktopUI user={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
}

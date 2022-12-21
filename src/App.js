import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Home from "./container/Home";
import { fetchUser } from "./utils/fetchUser";
import Spinner from "./components/Spinner";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if (!user) {
      <Spinner message="Logging you in ..." />;

      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;

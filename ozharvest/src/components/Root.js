import { Navigate, Outlet } from "react-router-dom";
import React, { useState, useContext } from "react";
import Nav from "./Nav";
import { AuthContext } from "../context/authContext";
import Login from "./Login";

const RootLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Nav />
      <main style={{ display: "contents" }}>
        {!user && <Navigate to="/login" />}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

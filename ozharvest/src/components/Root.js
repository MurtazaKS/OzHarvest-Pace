import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const RootLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Nav />
      <main style={{ display: "contents" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

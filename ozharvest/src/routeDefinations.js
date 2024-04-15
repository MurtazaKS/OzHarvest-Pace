import { createRoutesFromElements, Route } from "react-router-dom";
import Login from "./components/Login";
import RootLayout from "./components/Root";
import Register from "./components/Register";

const routeDefinitions = createRoutesFromElements(
  <>
    <Route path="/" element={<RootLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  </>
);

export default routeDefinitions;

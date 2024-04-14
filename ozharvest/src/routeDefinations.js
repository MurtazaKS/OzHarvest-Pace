import { createRoutesFromElements, Route } from "react-router-dom";
import Login from "./components/Login";

const routeDefinitions = createRoutesFromElements(
  <>
    <Route path="/login" element={<Login />} />
  </>
);

export default routeDefinitions;

import { createRoutesFromElements, Route } from "react-router-dom";
import Login from "./components/Login";
import RootLayout from "./components/Root";
import Register from "./components/Register";
import Home from "./components/Home";
import AddNewVisitor from "./components/AddNewVisitor";
import CheckInVisitor from "./components/CheckInVisitor";

const routeDefinitions = createRoutesFromElements(
  <>
    <Route path="/" element={<RootLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/newvisitor" element={<AddNewVisitor />} />
      <Route path="/checkin" element={<CheckInVisitor />} />
    </Route>
  </>
);

export default routeDefinitions;

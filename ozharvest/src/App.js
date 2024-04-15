import { ThemeProvider, createTheme, Box } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import routeDefinitions from "./routeDefinations";
import Login from "./components/Login";

const Router = createBrowserRouter(routeDefinitions);
const theme = createTheme({
  palette: {
    primary: {
      main: "#FADF01",
      contrastText: "#201D0C",
    },
    secondary: {
      main: "#201D0C",
      contrastText: "#FFFBF5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={Router}>
        <Nav />
        <Login />
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;

import { ThemeProvider, createTheme, Box, CssBaseline } from "@mui/material";
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
    background: {
      default: "#FFFBF5",
    },
    typography: {
      fontFamily: "Frankfurter, sans-serif",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={Router}>
        <Login />
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;

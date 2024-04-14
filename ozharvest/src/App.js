import { ThemeProvider, createTheme, Box } from "@mui/material";
import "./App.css";
import Nav from "./components/Nav";

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
      <Box className="App">
        <Nav />
      </Box>
    </ThemeProvider>
  );
}

export default App;

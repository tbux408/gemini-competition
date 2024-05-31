import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Home from "./Home.js";
import IconButton from "@mui/material/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f3e5f5",
      },
      text: {
        main: "#434A42",
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div style={{ padding: "5rem" }}>
          <Home />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

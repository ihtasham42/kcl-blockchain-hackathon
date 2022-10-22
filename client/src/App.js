import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <Box className="App">
      <CssBaseline />
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </Box>
  );
}

export default App;

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline, Typography } from "@mui/material";

function App() {
  return (
    <Box className="App">
      <CssBaseline />
      <Routes>
        <Route index element={<Typography>Example route</Typography>} />
      </Routes>
    </Box>
  );
}

export default App;

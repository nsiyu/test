import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import { AuthProvider } from "./context/AuthProvider";
import LoginPage from "./components/Login";
import HomePage from "./components/HomePage";
import LearningEventsList from "./components/LearningEventList";
import theme from "./theme.js";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<WithNavbar />}>
            <Route index element={<HomePage />} />]{" "}
          </Route>
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

function WithNavbar() {
  return (
    <>
      <Navbar />
      <Box pt="8rem">
        {" "}
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;

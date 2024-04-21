import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import { AuthProvider } from "./context/AuthProvider";
import LoginPage from "./components/Login";
import LearningEventsList from "./components/LearningEventList";
import theme from "./theme.js";
import Calendar from "./components/Calerndar/Calendar.jsx";
import StudyPlan from "./components/StudyPlan.jsx";
import Quiz from "./components/Quiz.jsx";
import EducationForm from "./components/EducationPreference.jsx";
import ContentPage from "./components/ContentPage.jsx";
import Flashcard from "./components/Flashcard.jsx";
import UploadPage from "./components/UploadPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/flashcard" element={<Flashcard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/contentPage" element={<ContentPage />} />
          <Route path="/UserInfo" element={<EducationForm />} />
          <Route path="/Courses" element={<LearningEventsList />} />
          <Route path="/studyplan" element={<StudyPlan />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route index element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;

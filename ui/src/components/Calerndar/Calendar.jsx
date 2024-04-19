import React, { useState } from "react";
import { ChakraProvider, extendTheme, Box, Button, useColorModeValue } from "@chakra-ui/react";
import Schedule from "./Schedule.jsx";
import TaskList from "./TaskList";
import theme from "../../theme.js";



export default function Calendar() {
  const [currentView, setCurrentView] = useState("Schedule");
  const buttonBgColor = useColorModeValue("buttonActive", "buttonInactive");
  const bgColor = useColorModeValue("bgLight", "gray.800");

  return (
    <ChakraProvider theme={theme}>
      <Box bg={bgColor} color="gray.800" p={5} minH="100vh">
        <Box mb={4}>
          <Button
            py={2}
            px={4}
            mr={2}
            borderRadius="md"
            onClick={() => setCurrentView("Schedule")}
            variant={currentView === "Schedule" ? "active" : "inactive"}
          >
            Show Schedule
          </Button>
          <Button
            py={2}
            px={4}
            borderRadius="md"
            onClick={() => setCurrentView("TaskList")}
            variant={currentView === "TaskList" ? "active" : "inactive"}
          >
            Show Task List
          </Button>
        </Box>
        {currentView === "Schedule" ? <Schedule /> : <TaskList />}
      </Box>
    </ChakraProvider>
  );
}

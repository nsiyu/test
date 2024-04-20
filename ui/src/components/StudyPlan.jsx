import React, { useState, useContext } from "react";
import {
  Box,
  VStack,
  HStack,
  IconButton,
  Text,
  Heading,
  useColorMode,
  useColorModeValue,
  Tooltip,
  useTheme, // Import useTheme to access the theme object
} from "@chakra-ui/react";
import {
  FaRobot,
  FaQuestionCircle,
  FaVideo,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const StudyPlan = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme(); // Use the theme object
  console.log(isAuthenticated);
  const navigate = useNavigate();
  const topics = [
    {
      id: 1,
      name: "React Basics",
      description: "Learn the basics of React.",
      finishTime: "5:10",
    },
    {
      id: 2,
      name: "Chakra UI",
      description: "Learn to style apps with Chakra UI.",
      finishTime: "10:50",
    },
    // Additional topics...
  ];

  const [selectedMethod, setSelectedMethod] = useState("");

  const learningMethods = {
    game: "Gamified Content",
    quiz: "Quiz Yourself",
    ai: "AI Tutor",
  };
  const handleBackToCourse = () => {
    navigate("/course");
  };

  return (
    <VStack spacing={6} align="stretch" p={5}>
      <HStack justifyContent="space-between">
        {isAuthenticated && (
          <Text
            fontSize="lg"
            cursor="pointer"
            color={theme.colors.primary} // Use the theme color for text
            _hover={{ color: "pink" }} // Use the theme color for hover
            onClick={handleBackToCourse} // Adjust this to navigate back
          >
            &larr; Back to Courses
          </Text>
        )}
        <Heading as="h1" size="xl">
          Your Study Plan
        </Heading>
        <IconButton
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          aria-label="Toggle color mode"
          onClick={toggleColorMode}
          bg={theme.colors.primary} // Use the theme color for button background
          _hover={{ bg: theme.colors.primaryDark }} // Use theme color for hover
          size="lg"
        />
      </HStack>
      {topics.map((topic) => (
        <Box
          key={topic.id}
          p={5}
          shadow="xl"
          borderWidth="1px"
          borderRadius="lg"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg={useColorModeValue("white", "gray.700")}
          transition="background 0.3s"
        >
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold" fontSize="lg">
              {topic.name}
            </Text>
            <Text fontSize="sm">Expected time: {topic.finishTime}</Text>
          </VStack>
          <HStack spacing={2}>
            {["quiz", "video", "ai"].map((method) => (
              <Tooltip label={learningMethods[method]} hasArrow>
                <IconButton
                  icon={
                    method === "quiz" ? (
                      <FaQuestionCircle />
                    ) : method === "video" ? (
                      <FaVideo />
                    ) : (
                      <FaRobot />
                    )
                  }
                  aria-label={`${learningMethods[method]} for ${topic.name}`}
                  bg={theme.colors.primary} // Use the theme color for button background
                  _hover={{ bg: theme.colors.primaryDark }} // Use theme color for hover
                  onClick={() =>
                    console.log(
                      `${learningMethods[method]} clicked for topic:`,
                      topic.name
                    )
                  }
                />
              </Tooltip>
            ))}
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default StudyPlan;

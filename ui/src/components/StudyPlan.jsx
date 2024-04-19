import React, { useState } from "react";
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
} from "@chakra-ui/react";
import {
  FaRobot,
  FaQuestionCircle,
  FaVideo,
  FaMoon,
  FaSun,
} from "react-icons/fa";

const StudyPlan = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
    {
      id: 3,
      name: "Redux for Beginners",
      description: "Introduction to state management with Redux.",
      finishTime: "7:30",
    },
    {
      id: 4,
      name: "Next.js Features",
      description: "Explore the features of Next.js for server-rendered apps.",
      finishTime: "12:45",
    },
    {
      id: 5,
      name: "TypeScript Essentials",
      description:
        "Learn the basics of TypeScript for strong typing in JavaScript.",
      finishTime: "8:20",
    },
    {
      id: 6,
      name: "GraphQL Basics",
      description: "Learn how to fetch data with GraphQL.",
      finishTime: "9:15",
    },
    {
      id: 7,
      name: "Tailwind CSS",
      description: "Design responsive interfaces quickly with Tailwind CSS.",
      finishTime: "4:50",
    },
    // Add more topics as needed
  ];

  const [selectedMethod, setSelectedMethod] = useState("");

  const learningMethods = {
    game: "Gamified Content",
    quiz: "Quiz Yourself",
    ai: "AI Tutor",
  };

  const handleMethodChange = (event) => setSelectedMethod(event.target.value);

  const iconButtonBg = useColorModeValue("blue.500", "blue.200");

  return (
    <VStack spacing={6} align="stretch" p={5}>
      <HStack justifyContent="space-between">
        <Heading as="h1" size="xl">
          Your Study Plan
        </Heading>
        <IconButton
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          aria-label="Toggle color mode"
          onClick={toggleColorMode}
          bg={iconButtonBg}
          _hover={{ bg: "blue.600" }}
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
                  bg={iconButtonBg}
                  _hover={{ bg: "blue.600" }}
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

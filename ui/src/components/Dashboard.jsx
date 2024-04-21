import React from "react";
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Flex,
  Icon,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { MdEvent, MdBook, MdSchool } from "react-icons/md";

// Dummy data for the to-do list
const todoList = [
  { lesson: "Introduction to React", topic: "Frontend Development", percentCompleted: 60 },
  { lesson: "Data Structures", topic: "Algorithms", percentCompleted: 40 },
  { lesson: "Linear Algebra", topic: "Mathematics", percentCompleted: 80 },
];

// Dummy data for upcoming exams
const upcomingExams = [
  { subject: "Mathematics", date: "April 30, 2024" },
  { subject: "Computer Science", date: "May 10, 2024" },
];

// Dummy data for current learning plan
const currentLearningPlan = [
  { topic: "Spaced Repetition", percentCompleted: 25 },
  { topic: "Active Recall", percentCompleted: 35 },
  { topic: "Chunking", percentCompleted: 20 },
  { topic: "Visualization", percentCompleted: 20 },
];

const Dashboard = ({ name }) => {
  return (
    <Container maxW="container.xl" p={4}>
      <Box>
        <Text fontSize="3xl" fontWeight="bold" mb={4}>Hi, {name}</Text>
        <Divider />
      </Box>
      <Flex mt={8} flexWrap="wrap" justifyContent="space-between">
        {/* To-Do List */}
        <Box w={["100%", "48%"]} p={4} rounded="lg" bg="white" shadow="lg">
          <HStack mb={4}>
            <Icon as={MdBook} fontSize="xl" />
            <Text fontSize="xl" fontWeight="bold">To-Do List</Text>
          </HStack>
          {todoList.map((item, index) => (
            <Box key={index} mb={2}>
              <Text fontSize="lg">
                <b>{item.lesson}</b>
              </Text>
              <Text fontSize="md">
                <b>Topic:</b> {item.topic}
              </Text>
            </Box>
          ))}
        </Box>
        {/* Current Learning Plan */}
        <Box w={["100%", "48%"]} h={["auto", "200%"]} p={4} rounded="lg" bg="white" shadow="lg" mb={4}>
          <HStack mb={4}>
            <Icon as={MdSchool} fontSize="xl" />
            <Text fontSize="xl" fontWeight="bold">Current Learning Plan</Text>
          </HStack>
          {currentLearningPlan.map((item, index) => (
            <Flex key={index} mb={2} alignItems="center">
              <Text mr={4}>{item.topic}</Text>
              <CircularProgress
                value={item.percentCompleted}
                size="40px"
                color="blue.400"
              >
                <CircularProgressLabel>{item.percentCompleted}%</CircularProgressLabel>
              </CircularProgress>
            </Flex>
          ))}
        </Box>
        {/* Upcoming Exams */}
        <Box w={["100%", "48%"]} p={4} rounded="lg" bg="white" shadow="lg">
          <HStack mb={4}>
            <Icon as={MdEvent} fontSize="xl" />
            <Text fontSize="xl" fontWeight="bold">Upcoming Exams</Text>
          </HStack>
          {upcomingExams.map((exam, index) => (
            <Box key={index} mb={2}>
              <Text fontSize="lg">
                <b>{exam.subject}</b>
              </Text>
              <Text fontSize="md">
                <b>Date:</b> {exam.date}
              </Text>
            </Box>
          ))}
        </Box>
      </Flex>
    </Container>
  );
};

export default Dashboard;

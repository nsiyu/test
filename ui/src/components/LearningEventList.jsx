import React from "react";
import {
  Box,
  Flex,
  Text,
  Progress,
  Badge,
  VStack,
  useColorModeValue,
  Icon,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { MdSchool } from "react-icons/md";

const LearningEventItem = ({ event }) => {
  return (
    <Flex
      p={5}
      shadow="md"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="lg"
      align="center"
      justify="space-between"
      mb={4}
    >
      <Icon as={MdSchool} w={10} h={10} color="blue.500" />
      <Box flex="1" ml={5}>
        <Text fontWeight="bold">{event.name}</Text>
        <Text fontSize="sm">{event.description}</Text>
        <Progress colorScheme="blue" size="sm" value={event.progress} mt={3} />
      </Box>
      <Wrap>
        <WrapItem>
          <Badge colorScheme="green">{event.status}</Badge>
        </WrapItem>
        <WrapItem>
          <Badge colorScheme="purple">{event.interactions} interactions</Badge>
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

const LearningEventsList = () => {
  const learningEvents = [
    {
      name: "Calculus 101",
      description: "Integration and Differentiation",
      progress: 75,
      status: "Active",
      interactions: "68.3K",
    },
    {
      name: "Calculus 101",
      description: "Integration and Differentiation",
      progress: 75,
      status: "Active",
      interactions: "68.3K",
    },
    {
      name: "Calculus 101",
      description: "Integration and Differentiation",
      progress: 75,
      status: "Active",
      interactions: "68.3K",
    },
    {
      name: "Calculus 101",
      description: "Integration and Differentiation",
      progress: 75,
      status: "Active",
      interactions: "68.3K",
    },
    {
      name: "Calculus 101",
      description: "Integration and Differentiation",
      progress: 75,
      status: "Active",
      interactions: "68.3K",
    },
  ];

  return (
    <VStack spacing={4} p={5}>
      <Text fontSize="2xl" fontWeight="bold">
        Your Classes
      </Text>
      {learningEvents.map((event, index) => (
        <LearningEventItem key={index} event={event} />
      ))}
    </VStack>
  );
};

export default LearningEventsList;

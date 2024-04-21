import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Progress,
  Badge,
  VStack,
  useColorModeValue,
  Icon,
  Heading,
  Input,
  Select,
  Tooltip,
  ScaleFade,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { MdSchool, MdFilterList } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
const eventsData = [
  {
    id: 1,
    name: "Calculus 101",
    description: "Integration and Differentiation",
    progress: 100,
    status: "Completed",
    interactions: "00:00",
  },
  {
    id: 2,
    name: "Physics 201",
    description: "Mechanics and Optics",
    progress: 100,
    status: "Completed",
    interactions: "00:00",
  },
  {
    id: 3,
    name: "Chemistry 300",
    description: "Organic Compounds",
    progress: 40,
    status: "In Progress",
    interactions: "16:50",
  },
  // More sample events
];

const LearningEventItem = ({ event }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const navigate = useNavigate();
  return (
    <ScaleFade
      initialScale={0.1}
      in={true}
      onClick={() => {
        navigate("/studyplan");
      }}
    >
      <Flex
        as="button"
        direction={{ base: "column", sm: "row" }}
        align="center"
        justify="space-between"
        p={4}
        shadow="md"
        borderWidth="1px"
        borderColor={borderColor}
        bg={bgColor}
        borderRadius="lg"
        mb={4}
        _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
        transition="background 0.2s"
        height="100px" // Set a fixed height for each card
        w="50vw"
      >
        <Icon as={MdSchool} w={8} h={8} color="blue.500" />
        <Box flex="1" ml={4}>
          <Text fontWeight="bold" fontSize="lg">
            {event.name}
          </Text>
          <Text fontSize="sm">{event.description}</Text>
          <Progress colorScheme="blue" size="sm" value={event.progress} />
        </Box>
        <Box>
          <Tooltip label={`${event.status} - Click for more info`} hasArrow>
            <Badge
              colorScheme={event.status === "Completed" ? "green" : "orange"}
            >
              {event.status}
            </Badge>
          </Tooltip>
          <Badge
            colorScheme="purple"
            ml={2}
          >{`${event.interactions} remaining`}</Badge>
        </Box>
      </Flex>
    </ScaleFade>
  );
};

const LearningEventsList = () => {
  const [events, setEvents] = useState(eventsData);
  const [filter, setFilter] = useState("");
  const [sortType, setSortType] = useState("Progress");

  useEffect(() => {
    const sortedEvents = [...events].sort((a, b) => {
      if (sortType === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortType === "progress") {
        return b.progress - a.progress;
      }
      return 0;
    });
    setEvents(sortedEvents);
  }, [sortType]);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilter(filterValue);
    const filteredEvents = eventsData.filter((event) =>
      event.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    setEvents(filteredEvents);
  };

  return (
    <VStack spacing={4} p={5}>
      <Flex w="full" justify="space-between" align="center">
        <Text
          mb={2}
          fontSize="2xl"
          color="brand.700"
          display="flex"
          alignItems="center"
        >
          <FaChalkboardTeacher size="1.25em" style={{ marginRight: 4 }} />
          Courses
        </Text>
        <Box>
          <Button
            leftIcon={<MdFilterList />}
            colorScheme="teal"
            onClick={() => setEvents(eventsData)}
          >
            Reset Filters
          </Button>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Input
          placeholder="Filter by class name..."
          value={filter}
          onChange={handleFilterChange}
        />
        <Select ml={2} onChange={(e) => setSortType(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="progress">Sort by Progress</option>
        </Select>
      </Flex>
      {events.map((event, index) => (
        <LearningEventItem key={index} event={event} />
      ))}
    </VStack>
  );
};

export default LearningEventsList;

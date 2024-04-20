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

const eventsData = [
  {
    id: 1,
    name: "Calculus 101",
    description: "Integration and Differentiation",
    progress: 75,
    status: "Active",
    interactions: "68.3K",
  },
  {
    id: 2,
    name: "Physics 201",
    description: "Mechanics and Optics",
    progress: 60,
    status: "Active",
    interactions: "45.1K",
  },
  {
    id: 3,
    name: "Chemistry 300",
    description: "Organic Compounds",
    progress: 40,
    status: "Pending",
    interactions: "25.7K",
  },
  // More sample events
];

const LearningEventItem = ({ event }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <ScaleFade initialScale={0.9} in={true}>
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
        onClick={() => console.log(`Navigate to details for ${event.name}`)}
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
            <Badge colorScheme={event.status === "Active" ? "green" : "orange"}>
              {event.status}
            </Badge>
          </Tooltip>
          <Badge
            colorScheme="purple"
            ml={2}
          >{`${event.interactions} interactions`}</Badge>
        </Box>
      </Flex>
    </ScaleFade>
  );
};

const LearningEventsList = () => {
  const [events, setEvents] = useState(eventsData);
  const [filter, setFilter] = useState("");
  const [sortType, setSortType] = useState("name");

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
        <Heading as="h1" size="xl">
          Your Classes
        </Heading>
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

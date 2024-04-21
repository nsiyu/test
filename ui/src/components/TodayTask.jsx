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
  Tooltip,
  ScaleFade,
} from "@chakra-ui/react";
import { MdSchool, MdFilterList } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LearningEventItem = ({ event, progress, estimateTime }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const navigate = useNavigate();

  const taskStatus = progress == 100 ? "Completed" : "In Progress";
  return (
    <ScaleFade
      initialScale={0.1}
      in={true}
      onClick={() => {
        navigate("/contentpage");
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
            {event.topic}
          </Text>
          <Text fontSize="sm">{event.description}</Text>
          <Progress colorScheme="blue" size="sm" value={progress} />
        </Box>
        <Box>
          <Tooltip label={`${taskStatus} - Click for more info`} hasArrow>
            <Badge
              colorScheme={taskStatus === "Completed" ? "green" : "orange"}
            >
              {taskStatus}
            </Badge>
          </Tooltip>
          <Badge
            colorScheme="purple"
            ml={2}
          >{`${estimateTime} remaining`}</Badge>
        </Box>
      </Flex>
    </ScaleFade>
  );
};

const TodayTask = () => {
  const [calendarItems, setCalendarItems] = useState([]);
  const monthMapping = {
    jan: "01",
    feb: "02",
    mar: "03",
    apr: "04",
    may: "05",
    jun: "06",
    jul: "07",
    aug: "08",
    sep: "09",
    oct: "10",
    nov: "11",
    dec: "12",
  };
  useEffect(() => {
    const fetchCalendarItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/get-calendar-items"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        const today = new Date().toISOString().slice(0, 10);

        const todayTasks = data.filter((task) => {
          const monthNumber = monthMapping[task.date];
          return `2024-${monthNumber}-${task.day}` === today;
        });

        setCalendarItems(todayTasks);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCalendarItems();
  }, []);

  const convertFetchedDataToTasks = (data) =>
    data.map((item, index) => ({
      id: index + 1,
      topic: item.topic,
      progress: Math.floor(Math.random() * 21) * 5, // Generates 0, 5, 10, ..., 95, 100
      estimatedTime: `${String(Math.floor(Math.random() * 24)).padStart(
        2,
        "0"
      )}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`, // Generates time in HH:MM format
    }));

  convertFetchedDataToTasks(calendarItems);
  return (
    <VStack spacing={4} p={5}>
      {calendarItems.map((calendarItem, index) => (
        <LearningEventItem
          key={index}
          event={calendarItem}
          progress={Math.floor(Math.random() * 21) * 5}
          estimateTime={`${String(Math.floor(Math.random() * 24)).padStart(
            2,
            "0"
          )}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`}
        />
      ))}
    </VStack>
  );
};

export default TodayTask;

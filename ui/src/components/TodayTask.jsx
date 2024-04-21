import React from "react";
import { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, Container } from "@chakra-ui/react";
import theme from "../theme";

const TodayTask = () => {
  const { colors, shadows, radii } = theme;
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

  return (
    <Container maxW="container.xl" p="6">
      <VStack spacing={5} align="stretch">
        {calendarItems.map((task, index) => (
          <Box
            key={index}
            bg={colors.backgroundLight || "gray.50"}
            shadow={shadows.md}
            rounded={radii.md}
            p={6}
            mb={4}
          >
            <Text color={colors.text || "gray.600"} fontSize="md">
              {task.topic}
            </Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default TodayTask;

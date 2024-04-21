import React from "react";
import { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, Container } from "@chakra-ui/react";
import theme from "../../theme";

const TaskList = () => {
  const { colors, shadows, radii } = theme;
  const [calendarItems, setCalendarItems] = useState([]);

  useEffect(() => {
    const fetchCalendarItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/get-calendar-items"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCalendarItems(data);
        console.log(calendarItems);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCalendarItems();
  }, []);

  return (
    <Container maxW="container.xl" p="6">
      <VStack spacing={5} align="stretch">
        {calendarItems.map((task, index, arr) => (
          <Box key={index}>
            {index === 0 || arr[index - 1].date !== task.date ? (
              <Heading
                mt={8}
                mb={4}
                fontSize="xl"
                color={colors.primary || "blue.800"}
              >
                {task.date} {task.day}
              </Heading>
            ) : null}
            <Box
              bg={colors.backgroundLight || "gray.50"}
              shadow={shadows.md}
              rounded={radii.md}
              p={6}
              mb={0}
            >
              <Text color={colors.text || "gray.600"} fontSize="md">
                {task.topic}
              </Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default TaskList;

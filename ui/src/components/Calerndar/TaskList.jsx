import React from "react";
import { Box, VStack, Heading, Text, Container } from "@chakra-ui/react";

// Sample task data
const tasks = [
  {
    date: "2024-04-20",
    description: "Complete the quarterly financial report.",
  },
  {
    date: "2024-04-22",
    description:
      "Meet with the project team to discuss the new project launch.",
  },
  { date: "2024-04-25", description: "Presentation to potential investors." },
  { date: "2024-04-25", description: "Team outing at local park." },
];

const TaskList = () => {
  // Function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxW="container.xl" p="6">
      <VStack spacing="6" align="stretch">
        {tasks.map((task, index, arr) => (
          <Box key={index}>
            {index === 0 || arr[index - 1].date !== task.date ? (
              <Heading mt="8" mb="4" fontSize="xl">
                {formatDate(task.date)}
              </Heading>
            ) : null}
            <Box bg="gray.100" shadow="md" rounded="lg" p="6" mb="6">
              <Text color="gray.600">{task.description}</Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default TaskList;

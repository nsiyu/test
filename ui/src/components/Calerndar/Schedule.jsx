import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Select,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const tasks = [
  { id: 1, date: "2024-04-01", name: "Project kickoff" },
  { id: 2, date: "2024-05-03", name: "Design review" },
  { id: 3, date: "2024-06-10", name: "Stakeholder meeting" },
  { id: 4, date: "2024-07-15", name: "Mid-month report" },
  { id: 5, date: "2024-08-20", name: "Team outing" },
  { id: 6, date: "2024-09-30", name: "Project wrap-up" },
];

const months = [
  { num: 0, name: "January", days: 31 },
  { num: 1, name: "February", days: 28 },
  { num: 2, name: "March", days: 31 },
  { num: 3, name: "April", days: 30 },
  { num: 4, name: "May", days: 31 },
  { num: 5, name: "June", days: 30 },
  { num: 6, name: "July", days: 31 },
  { num: 7, name: "August", days: 31 },
  { num: 8, name: "September", days: 30 },
  { num: 9, name: "October", days: 31 },
  { num: 10, name: "November", days: 30 },
  { num: 11, name: "December", days: 31 },
];

function Schedule() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    new Date().getMonth()
  );

  const handleMonthChange = (event) => {
    setSelectedMonthIndex(parseInt(event.target.value, 10));
  };



  const bgColor = useColorModeValue("gray.50", "gray.700");
  const hoverBgColor = useColorModeValue("blue.100", "blue.900");

  return (
    <Box maxW="6xl" mx="auto" p={5} bg="white" boxShadow="xl" borderRadius="lg">
      <Box
        mb={5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" size="xl" color="gray.700">
          {months[selectedMonthIndex].name} Schedule
        </Heading>
        <Select
          onChange={handleMonthChange}
          placeholder="Select month"
          value={selectedMonthIndex}
          borderColor="gray.600"
          color="gray.700"
          w="20%"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month.name}
            </option>
          ))}
        </Select>
      </Box>
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {Array.from(
          { length: months[selectedMonthIndex].days },
          (_, i) => i + 1
        ).map((day) => (
          <GridItem
            key={day}
            p={3}
            bg={bgColor}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            height="120px"
            _hover={{
              bg: hoverBgColor,
              transform: "scale(1.02)",
              transition: "all .2s ease-in-out",
            }}
          >
            <Text fontWeight="bold" color="gray.800">
              {day}
            </Text>
            {tasks
              .filter(
                (task) =>
                  new Date(task.date).getMonth() === selectedMonthIndex &&
                  new Date(task.date).getDate() === day
              )
              .map((task) => (
                <Text key={task.id} mt={1} fontSize="sm" color="gray.600">
                  {task.name}
                </Text>
              ))}
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default Schedule;

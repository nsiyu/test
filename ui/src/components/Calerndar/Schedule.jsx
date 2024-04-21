import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Select,
  Grid,
  GridItem,
  Text,
  Tooltip,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";

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
const monthAbbreviations = {
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

function Schedule() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    new Date().getMonth()
  );
  const [calendarItems, setCalendarItems] = useState([]);

  const convertFetchedDataToTasks = (data) =>
    data.map((item, index) => ({
      id: index + 1,
      date: `2024-${
        monthAbbreviations[item.date.toLowerCase()]
      }-${item.day.padStart(2, "0")}`,
      name: item.topic,
    }));

  const tasks = convertFetchedDataToTasks(calendarItems);

  useEffect(() => {
    const fetchCalendarItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/get-calendar-items"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCalendarItems(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCalendarItems();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonthIndex(parseInt(event.target.value, 10));
  };

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const hoverBgColor = useColorModeValue("blue.100", "blue.900");

  return (
    <Box maxW="6xl" mx="auto" p={5} bg="white" boxShadow="xl" borderRadius="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={5}
      >
        <Heading as="h2" size="xl" color="gray.700">
          {months[selectedMonthIndex].name} Schedule
        </Heading>
        <Select
          onChange={handleMonthChange}
          value={selectedMonthIndex}
          placeholder="Select month"
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
                <Box bg={"pink"} borderRadius={"0.3em"} p={0.1} pb={1.5} pl={1} mb={1}>
                    <Tooltip label={task.name} aria-label="A tooltip">
                      <Text isTruncated maxW="120px" mt={1} fontSize={"xs"}>
                        {task.name}
                      </Text>
                    </Tooltip>
                </Box>
              ))}
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default Schedule;

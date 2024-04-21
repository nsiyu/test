import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  HStack,
  Container,
  List,
  ListItem,
  ListIcon,
  Progress,
  Badge,
  extendTheme,
  Icon,
} from "@chakra-ui/react";
import {
  MdCheckCircle,
  MdOutlineSchool,
  MdWorkOutline,
  MdSchool,
} from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import theme from "../theme";
import TodayTask from "./TodayTask";
import LearningEventsList from "./LearningEventList";

function Dashboard() {
  const today = new Date().toISOString().slice(5, 10);

  return (
    <ChakraProvider theme={theme}>
      <Box
        p={5}
        w="full"
        minH="100vh"
        bgGradient="linear(to-br, brand.50, brand.100)"
        color="brand.900"
      >
        <Container maxW="container.xl" centerContent>
          <VStack spacing={10} align="stretch" w="full">
            <Text fontSize="3xl" textAlign="center">
              Welcome back, Willy!
            </Text>
            <HStack spacing={10} align="stretch">
              <VStack>
                <Box
                  flex={1}
                  p={4}
                  shadow="lg"
                  rounded="lg"
                  bg="white"
                  borderWidth="1px"
                  borderColor="brand.300"
                >
                  <Text
                    mb={2}
                    fontSize="lg"
                    color="brand.700"
                    display="flex"
                    alignItems="center"
                  >
                    <MdWorkOutline size="1.25em" style={{ marginRight: 4 }} />
                    Today's Tasks {today}
                  </Text>
                  <Progress colorScheme="pink" size="sm" value={66} mb={4} />
                  <TodayTask></TodayTask>
                </Box>
                <Box
                  flex={1}
                  p={4}
                  shadow="lg"
                  rounded="lg"
                  bg="white"
                  borderWidth="1px"
                  borderColor="brand.300"
                >
                  <Text
                    mb={2}
                    fontSize="lg"
                    color="brand.700"
                    display="flex"
                    alignItems="center"
                  >
                    <MdWorkOutline size="1.25em" style={{ marginRight: 4 }} />
                    Today's Tasks {today}
                  </Text>
                </Box>
              </VStack>
              <Box
                flex={3}
                p={4}
                shadow="lg"
                rounded="lg"
                bg="white"
                borderWidth="1px"
                borderColor="brand.300"
              >
                <LearningEventsList></LearningEventsList>
              </Box>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default Dashboard;

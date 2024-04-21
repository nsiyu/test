import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  IconButton,
  Text,
  Heading,
  useColorMode,
  useColorModeValue,
  Tooltip,
  useTheme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FaMoon, FaSun, FaUpload, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

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
const StudyPlan = () => {
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
  console.log(tasks);
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

  const { isAuthenticated } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const navigate = useNavigate();
  const topics = [
    {
      name: "React Basics",
      finishTime: "5:10",
    },
    {
      name: "Chakra UI",
      finishTime: "10:50",
    },
    // Additional topics...
  ];

  const [uploadedVideos, setUploadedVideos] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [videoLink, setVideoLink] = useState("");

  const handleUpload = (topicId, link) => {
    setUploadedVideos((prevVideos) => ({
      ...prevVideos,
      [topicId]: link,
    }));
    setIsOpen(false);
    setVideoLink("");
  };

  const renderIcons = (topicId) => {
    if (uploadedVideos[topicId]) {
      // Show play icon if video is uploaded
      return (
        <Tooltip label="Play Video" hasArrow>
          <IconButton
            icon={<FaPlay />}
            aria-label="Play Video"
            bg={theme.colors.primary}
            _hover={{ bg: theme.colors.primaryDark }}
            onClick={() =>
              console.log("Play video for topic:", topics[topicId].name)
            }
          />
        </Tooltip>
      );
    } else {
      // Show upload button if video is not uploaded
      return (
        <Tooltip label="Upload Video" hasArrow>
          <IconButton
            icon={<FaUpload />}
            aria-label="Upload Video"
            bg={theme.colors.primary}
            _hover={{ bg: theme.colors.primaryDark }}
            onClick={() => {
              setSelectedTopicId(topicId);
              setIsOpen(true);
            }}
          />
        </Tooltip>
      );
    }
  };

  return (
    <VStack spacing={6} align="stretch" p={5}>
      <HStack justifyContent="space-between">
        {isAuthenticated && (
          <Text
            fontSize="lg"
            cursor="pointer"
            color={theme.colors.primary}
            _hover={{ color: "pink" }}
            onClick={() => {
              navigate("/courses");
            }}
          >
            &larr; Back to Courses
          </Text>
        )}
        <Heading as="h1" size="xl">
          Your Study Plan
        </Heading>
        <IconButton
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          aria-label="Toggle color mode"
          onClick={toggleColorMode}
          bg={theme.colors.primary}
          _hover={{ bg: theme.colors.primaryDark }}
          size="lg"
        />
      </HStack>
      {tasks.map((task, index) => (
        <Box
          key={index}
          p={5}
          shadow="xl"
          borderWidth="1px"
          borderRadius="lg"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg={useColorModeValue("white", "gray.700")}
          transition="background 0.3s"
          onClick={() => {
            navigate("/contentpage");
          }}
          _hover={{ cursor: "pointer" }}
        >
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold" fontSize="lg">
              {task.name}
            </Text>
            <Text fontSize="sm">Expected time: {task.date}</Text>
          </VStack>
          <HStack spacing={2}>{renderIcons(task.id)}</HStack>
        </Box>
      ))}

      {/* Video Upload Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter video link:</FormLabel>
              <Input
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="https://www.example.com/video"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpload(selectedTopicId, videoLink)}
            >
              Upload
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default StudyPlan;

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
  IconButton,
} from "@chakra-ui/react";
import { MdSchool, MdFilterList } from "react-icons/md";
import { FaUpload, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TodayTask = () => {
  const [calendarItems, setCalendarItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [uploadedVideos, setUploadedVideos] = useState({});
  const navigate = useNavigate();

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

  const handleUpload = (eventId, link) => {
    setUploadedVideos((prevVideos) => ({
      ...prevVideos,
      [eventId]: link,
    }));
    setIsOpen(false);
    setVideoLink("");
  };

  const renderIcons = (eventId) => {
    if (uploadedVideos[eventId]) {
      return (
        <Tooltip label="Play Video" hasArrow>
          <IconButton
            icon={<FaPlay />}
            aria-label="Play Video"
            onClick={() => console.log("Play video for event ID:", eventId)}
          />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip label="Upload Video" hasArrow>
          <IconButton
            icon={<FaUpload />}
            aria-label="Upload Video"
            onClick={() => {
              setSelectedEventId(eventId);
              setIsOpen(true);
            }}
          />
        </Tooltip>
      );
    }
  };

  return (
    <VStack spacing={4} p={5}>
      {calendarItems.map((calendarItem, index) => (
        <ScaleFade key={index} initialScale={0.1} in={true}>
          <Flex
            as="button"
            direction={{ base: "column", sm: "row" }}
            align="center"
            justify="space-between"
            p={4}
            shadow="md"
            borderWidth="1px"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="lg"
            mb={4}
            _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
            transition="background 0.2s"
            height="100px"
            w="50vw"
          >
            <Icon as={MdSchool} w={8} h={8} color="blue.500" />
            <Box flex="1" ml={4}>
              <Text
                fontWeight="bold"
                fontSize="lg"
                onClick={() => navigate("/contentpage")}
              >
                {calendarItem.topic}
              </Text>
              <Text fontSize="sm">{calendarItem.description}</Text>
            </Box>
            <Box>{renderIcons(calendarItem.id)}</Box>
          </Flex>
        </ScaleFade>
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
              onClick={() => handleUpload(selectedEventId, videoLink)}
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

export default TodayTask;

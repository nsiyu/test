import React, { useState, useEffect, useContext } from "react";
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
import AuthContext from "../context/AuthProvider"; // Adjust the path as necessary

const TodayTask = () => {
  const [calendarItems, setCalendarItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [uploadedVideos, setUploadedVideos] = useState({});
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

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

  const handleUpload = (topicId, link) => {
    setUploadedVideos((prev) => ({
      ...prev,
      [topicId]: link,
    }));
    setIsOpen(false);
    setVideoLink("");
  };

  const renderIcons = (topicId) => {
    if (uploadedVideos[topicId]) {
      return (
        <Tooltip label="Play Video" hasArrow>
          <IconButton
            icon={<FaPlay />}
            aria-label="Play Video"
            onClick={() => console.log("Play video for topic:", topicId)}
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
              setSelectedTopicId(topicId);
              setIsOpen(true);
            }}
          />
        </Tooltip>
      );
    }
  };

  return (
    <VStack spacing={4} p={5}>
      {calendarItems.map((item, index) => (
        <Flex
          key={index}
          as="button"
          direction={{ base: "column", sm: "row" }}
          align="center"
          justify="space-between"
          p={4}
          shadow="md"
          borderWidth="1px"
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
              onClick={() => {
                navigate("contentpage");
              }}
            >
              {item.topic}
            </Text>
            <Progress colorScheme="blue" size="sm" value={0} />
          </Box>
          <Box>
            <Tooltip label="Click for more info" hasArrow>
              <Badge colorScheme="green">In Progress</Badge>
            </Tooltip>
            <Badge colorScheme="purple" ml={2}>
              12:34 remaining
            </Badge>
          </Box>
          {renderIcons(index)}
        </Flex>
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
            <Button onClick={() => handleUpload(selectedTopicId, videoLink)}>
              Upload
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default TodayTask;

import React, { useState, useContext } from "react";
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
import { FaRobot, FaQuestionCircle, FaMoon, FaSun, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const StudyPlan = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const navigate = useNavigate();
  const topics = [
    {
      id: 1,
      name: "React Basics",
      description: "Learn the basics of React.",
      finishTime: "5:10",
    },
    {
      id: 2,
      name: "Chakra UI",
      description: "Learn to style apps with Chakra UI.",
      finishTime: "10:50",
    },
    // Additional topics...
  ];

  const [uploadedVideos, setUploadedVideos] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [videoLink, setVideoLink] = useState('');

  const handleUpload = (topicId, link) => {
    setUploadedVideos((prevVideos) => ({
      ...prevVideos,
      [topicId]: link,
    }));
    setIsOpen(false);
    setVideoLink('');
  };

  const renderIcons = (topicId) => {
    if (uploadedVideos[topicId]) {
      return (
        <>
          <Tooltip label="Quiz Yourself" hasArrow>
            <IconButton
              icon={<FaQuestionCircle />}
              aria-label="Quiz Yourself"
              bg={theme.colors.primary}
              _hover={{ bg: theme.colors.primaryDark }}
              onClick={() =>
                console.log("Quiz clicked for topic:", topics[topicId].name)
              }
            />
          </Tooltip>
          <Tooltip label="AI Tutor" hasArrow>
            <IconButton
              icon={<FaRobot />}
              aria-label="AI Tutor"
              bg={theme.colors.primary}
              _hover={{ bg: theme.colors.primaryDark }}
              onClick={() =>
                console.log("AI Tutor clicked for topic:", topics[topicId].name)
              }
            />
          </Tooltip>
          <Tooltip label="Gamified Content" hasArrow>
            <IconButton
              icon={<FaRobot />}
              aria-label="Gamified Content"
              bg={theme.colors.primary}
              _hover={{ bg: theme.colors.primaryDark }}
              onClick={() =>
                console.log("Gamified Content clicked for topic:", topics[topicId].name)
              }
            />
          </Tooltip>
        </>
      );
    } else {
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
      {topics.map((topic) => (
        <Box
          key={topic.id}
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
        >
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold" fontSize="lg">
              {topic.name}
            </Text>
            <Text fontSize="sm">Expected time: {topic.finishTime}</Text>
          </VStack>
          <HStack spacing={2}>
            {renderIcons(topic.id)}
          </HStack>
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
            <Button colorScheme="blue" mr={3} onClick={() => handleUpload(selectedTopicId, videoLink)}>
              Upload
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default StudyPlan;

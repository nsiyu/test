import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Container,
  Heading,
  SimpleGrid,
  Progress,
  List,
  ListItem,
  ListIcon,
  Flex,
  useToast,
  Center,
  AspectRatio,
} from "@chakra-ui/react";
import { FaGoogleDrive, FaUpload } from "react-icons/fa";
import { MdCheckCircle, MdReplay, MdForward } from "react-icons/md";
import ReactPlayer from "react-player";
import Flashcards from "./Flashcard"; // Assuming Flashcards component is in a separate file

function App() {
  const [file, setFile] = useState(null);
  const [showVideo, setShowVideo] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const toast = useToast();
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFile(file);
    // Optionally trigger the upload function immediately after file selection
    // handleFileUpload(file);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Assuming you have a server ready to receive the file at this endpoint
    // Adjust the URL to your needs
    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "File uploaded successfully",
          description: "Text has been extracted from the PDF.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Upload failed",
          description: "Unable to upload file.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowButtons(true);
  };

  const handleReplay = () => {
    setShowVideo(true);
    setShowButtons(false);
    setShowFlashcards(false);
  };

  const handleMoveOn = () => {
    setShowFlashcards(true);
    setShowButtons(false);
    setShowVideo(false);
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Flex>
        <VStack w="80%" spacing={8}>
          {showVideo && (
            <AspectRatio ratio={16 / 9} w="full">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=xuP4g7IDgDM&ab_channel=NatureBlogs"
                width="100%"
                height="500px"
                onEnded={handleVideoEnd}
              />
            </AspectRatio>
          )}
          {showFlashcards && <Flashcards />}
          {showButtons && (
            <Flex w="full" justify="center">
              <Button
                onClick={handleReplay}
                colorScheme="blue"
                variant="ghost"
                size="lg"
                aria-label="Replay"
                mr={4}
              >
                <MdReplay size={32} />
              </Button>
              <Button
                onClick={handleMoveOn}
                colorScheme="blue"
                variant="ghost"
                size="lg"
                aria-label="Move On"
              >
                <MdForward size={32} />
              </Button>
            </Flex>
          )}
        </VStack>
        <VStack w="20%" spacing={8} align="stretch">
          {/* Chat box */}
          <Box p={4} borderWidth="1px" borderRadius="lg" w="full" h="500px">
            <Heading as="h3" size="md">
              AI Chat
            </Heading>
            <VStack spacing={4} align="stretch" h="100%">
              {/* Placeholder text bubbles */}
              <Box
                alignSelf="flex-start"
                p={2}
                bg="blue.200"
                borderRadius="lg"
                maxW="70%"
              >
                <Text>Chungus mccrispy</Text>
              </Box>
              <Box
                alignSelf="flex-end"
                p={2}
                bg="green.200"
                borderRadius="lg"
                maxW="70%"
              >
                <Text>delux</Text>
              </Box>
              {/* Input text box */}
              <Box>
                <Input placeholder="Type your message" />
              </Box>
              {/* Send button */}
              <Button size="sm" colorScheme="blue">
                Send
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
}

export default App;

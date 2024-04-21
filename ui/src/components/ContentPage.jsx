import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Container,
  Flex,
  Heading,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { MdReplay, MdForward } from "react-icons/md";
import ReactPlayer from "react-player";
import Flashcards from "./Flashcard";
import Typing from "./Typing";
import ChatBot from "./ChatBot.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  const [showVideo, setShowVideo] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowButtons(true);
  };

  const handleReplay = () => {
    setShowVideo(true);
    setShowButtons(false);
    setShowFlashcards(false);
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Flex direction="column" gap={6}>
        <Flex justify="space-between" align="center">
          <Box flex="1" p={2}>
            {showVideo && (
              <Box
                width="100%"
                maxW="400px" // Further reduced maximum width
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
              >
                <ReactPlayer
                  url="https://storage.googleapis.com/klap-renders/c785d3fe-66fe-473d-8945-8fccb87554ae-56ed2909-48d9-4392-bccf-86a4fb3d8123.mp4"
                  width="100%"
                  height="100%"
                  controls
                  onEnded={handleVideoEnd}
                  style={{ borderRadius: "8px" }}
                />
              </Box>
            )}
            {showButtons && (
              <HStack justify="center" spacing={4} mt={4}>
                <Button
                  onClick={handleReplay}
                  colorScheme="blue"
                  variant="outline"
                  leftIcon={<MdReplay size={24} />}
                >
                  Replay
                </Button>
                <Button
                  onClick={() => {
                    navigate("/quizpage");
                  }}
                  colorScheme="blue"
                  variant="outline"
                  leftIcon={<MdForward size={24} />}
                >
                  Next
                </Button>
              </HStack>
            )}
          </Box>
          <Box flex="1" p={2}>
            <ChatBot />
          </Box>
        </Flex>
        <Box w="100%" borderWidth="1px" borderRadius="lg" p={4} boxShadow="sm">
          <Button onClick={() => setShowNotes(!showNotes)}>
            {showNotes ? "Hide Notes" : "Show Notes"}
          </Button>
          {showNotes && (
            <VStack mt={4} align="stretch">
              <Heading as="h3" size="md" mb={2}>
                Notes
              </Heading>
              <Typing />
            </VStack>
          )}
        </Box>
      </Flex>
    </Container>
  );
}

export default App;

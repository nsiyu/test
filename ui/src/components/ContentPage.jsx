import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Container,
  Heading,
  Flex,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { MdReplay, MdForward } from "react-icons/md";
import ReactPlayer from "react-player";
import Flashcards from "./Flashcard"; // Assuming Flashcards component is in a separate file
import Typing from "./Typing"; // Assuming Typing component is in a separate file
import ChatBot from "./ChatBot.jsx";
import { useNavigate } from "react-router-dom";
function App() {
  const [showVideo, setShowVideo] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const toast = useToast();
  const [showNotes, setShowNotes] = useState(false);
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

  const handleMoveOn = () => {
    navigate("/quizpage");
  };

  // Aspect ratio of the video (16:9)
  const videoAspectRatio = 16 / 9;

  return (
    <Container maxW="container.xl" p={4}>
      <Flex direction="column">
        <Flex>
          <VStack w="50%" spacing={8}>
            {showVideo && (
              <Box
                width="100%/3"
                maxWidth={`${videoAspectRatio * 500}px`} // Adjusted width based on aspect ratio
                maxHeight="600px"
                overflow="hidden"
              >
                <ReactPlayer
                  url="https://storage.googleapis.com/klap-renders/f6b71095-2a6d-4d7a-8b42-336e204c8ee7-cea9f61f-309d-4274-a7db-945b6a2f3305.mp4"
                  width="100%"
                  height="100%"
                  controls
                  onEnded={handleVideoEnd}
                />
              </Box>
            )}
            {showFlashcards && <Flashcards />}
            {showButtons && (
              <Flex w="full" justify="center" spacing={4}>
                <Button
                  onClick={handleReplay}
                  colorScheme="blue"
                  variant="ghost"
                  aria-label="Replay"
                >
                  <MdReplay size={32} />
                </Button>
                <Button
                  onClick={handleMoveOn}
                  colorScheme="blue"
                  variant="ghost"
                  aria-label="Move On"
                >
                  <MdForward size={32} />
                </Button>
              </Flex>
            )}
          </VStack>
          <HStack w="40%" spacing={8} align="stretch" justify={"end"}>
            <ChatBot></ChatBot>
          </HStack>
        </Flex>
        {/* Notes with typing */}
        <VStack w="100%" align="stretch" mt={"2em"}>
          <Box p={4} borderWidth="1px" borderRadius="lg" w="90%">
            <Button onClick={() => setShowNotes(!showNotes)}>Show Notes</Button>
            {showNotes && (
              <VStack w="100%" align="stretch">
                <Box p={4} borderWidth="1px" borderRadius="lg" w="90%">
                  <Heading as="h3" size="md" mb={2}>
                    Notes
                  </Heading>
                  <Typing />
                </Box>
              </VStack>
            )}
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
}

export default App;

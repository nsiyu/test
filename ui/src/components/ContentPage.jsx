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
} from "@chakra-ui/react";
import { MdReplay, MdForward } from "react-icons/md";
import ReactPlayer from "react-player";
import Flashcards from "./Flashcard"; // Assuming Flashcards component is in a separate file
import Typing from "./Typing"; // Assuming Typing component is in a separate file

function App() {
  const [showVideo, setShowVideo] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const toast = useToast();

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
    // Redirect the user to the quiz page
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
          <VStack w="50%" spacing={8} align="stretch">
            {/* Chat box */}
            <Box p={4} borderWidth="1px" borderRadius="lg" w="90%" h="600px" position="relative">
              <Heading as="h3" size="md">
                AI Chat
              </Heading>
              {/* Placeholder text bubbles */}
              <VStack
                spacing={4}
                align="stretch"
                h="calc(100% - 60px)" // Adjusted height to accommodate the input and button
                justifyContent="space-between"
              >
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
              </VStack>
              <Flex
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                align="center"
                justify="space-between"
                p={2}
              >
                <Input placeholder="Type your message" />
                <Button size="sm" colorScheme="blue">
                  Upload
                </Button>
              </Flex>
            </Box>
          </VStack>
        </Flex>
        {/* Notes with typing */}
        <VStack w="100%" align="stretch">
          <Box p={4} borderWidth="1px" borderRadius="lg" w="90%">
            <Heading as="h3" size="md" mb={2}>
              Notes
            </Heading>
            <Typing />
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
}

export default App;

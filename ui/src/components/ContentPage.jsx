import React from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Container,
  Heading,
  SimpleGrid,
  Progress,
  List,
  ListItem,
  ListIcon,
  Flex,
} from "@chakra-ui/react";
import { FaGoogleDrive, FaUpload } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import Upload from "./Upload.jsx";

function App() {
  return (
    <Container maxW="container.xl" p={4}>
      <Flex direction="row" justify="space-between" align="start">
        <VStack spacing={4} align="stretch" flex="1">
          <Heading as="h1" size="md" mb={0}>
            Upload Additional Notes
          </Heading>
          <Box w="full" p={4} borderWidth="1px" borderRadius="lg">
            <VStack spacing={4}>
              <HStack w="full" alignItems="center" spacing={4}>
                <Input
                  placeholder="Paste your notes here"
                  size="lg"
                  flexGrow={1}
                />
                <Button colorScheme="blue" leftIcon={<FaUpload />}>
                  Upload
                </Button>
              </HStack>
              <HStack spacing={4}>
                <Upload></Upload>
                <Button leftIcon={<FaGoogleDrive />} colorScheme="teal">
                  Select Google Drive
                </Button>
              </HStack>
            </VStack>
          </Box>
          <Box w="full">
            <Heading as="h2" size="md" mb={4}>
              Ways to Learn
            </Heading>
            <SimpleGrid columns={4} spacing={5}>
              <FeatureBox
                icon="📄"
                title="Generate Flashcards"
                onClick={() => alert("Generating Flashcards...")}
              />
              <FeatureBox
                icon="📝"
                title="Generate Quizzes"
                onClick={() => alert("Generating Quizzes...")}
              />
              <FeatureBox
                icon="💬"
                title="Chat with AI"
                onClick={() => alert("Starting AI Chat...")}
              />
              <FeatureBox
                icon="🎥"
                title="Generate Short Videos"
                onClick={() => alert("Creating Short Videos...")}
              />
            </SimpleGrid>
          </Box>
        </VStack>
        <VStack
          w="300px"
          ml={10}
          spacing={4}
          borderWidth="1px"
          p={4}
          borderRadius="lg"
          height="100%"
        >
          <Heading as="h3" size="md">
            Daily Quests
          </Heading>
          <Progress colorScheme="green" size="sm" value={75} mb={4} />
          <List spacing={3} overflowY="auto">
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Upload today's lecture notes
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Generate flashcards for chapter 7
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Complete AI chat session
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Review generated video content
            </ListItem>
          </List>
        </VStack>
      </Flex>
    </Container>
  );
}

function FeatureBox({ icon, title, onClick }) {
  return (
    <Button
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      w="full"
      h="150px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      onClick={onClick}
    >
      <Text fontSize="4xl">{icon}</Text>
      <Text>{title}</Text>
    </Button>
  );
}

export default App;

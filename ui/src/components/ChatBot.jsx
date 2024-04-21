import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";

function Chat() {
  // Initialize the messages state with a welcome message from the AI
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am your ai tutor, you can ask me anything about this lecture",
      sender: "ai",
    },
    {
      text: "why is Dynamic programming important",
      sender: "user",
    },
    {
      text: "Dynamic programming optimizes complex problems by breaking them into simpler subproblems.",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        // AI generates a response
        setMessages((messages) => [
          ...messages,
          { text: "AI Response to: " + input, sender: "ai" },
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      w="90%"
      h="600px"
      position="relative"
      bg="white"
      p={4}
    >
      <Heading as="h3" size="md" mb={4} color="gray.800">
        AI Chat
      </Heading>
      <VStack
        spacing={4}
        align="stretch"
        h="calc(100% - 100px)"
        overflowY="auto"
        px={4}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}
            p={3}
            bg={message.sender === "user" ? "blue.100" : "gray.100"}
            color={message.sender === "user" ? "gray.800" : "black"}
            borderRadius="xl"
            maxW={"70%"}
          >
            <Text>{message.text}</Text>
          </Box>
        ))}
        <div ref={endOfMessagesRef} />
      </VStack>
      <Flex
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        align="center"
        justify="space-between"
        p={3}
        borderTopWidth="1px"
        borderColor="gray.200"
      >
        <Input
          placeholder="Type your message"
          flexGrow={1}
          mr={2}
          value={input}
          borderRadius="full"
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <Button
          onClick={handleSend}
          size="sm"
          colorScheme="blue"
          borderRadius="full"
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
}

export default Chat;

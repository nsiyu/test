import React from "react";
import {
  ChakraProvider,
  extendTheme,
  ColorModeProvider,
  Container,
  VStack,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const questions = [
  { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    id: 3,
    question: "Which language is primarily used for web development?",
    options: ["Python", "JavaScript", "Java"],
    answer: "JavaScript",
  },
];

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "gray.100", // Set a global background color for the light theme
        color: "black", // Ensure text is optimally readable
      },
    },
  },
});

export default function Quiz() {
  const [answers, setAnswers] = React.useState({});
  const [feedback, setFeedback] = React.useState({});

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
    setFeedback({
      ...feedback,
      [questionId]:
        option === questions.find((q) => q.id === questionId).answer
          ? "correct"
          : "incorrect",
    });
  };

  return (
    <Container centerContent p={4}>
      <VStack spacing={8}>
        {questions.map((question) => (
          <Box
            key={question.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            width="100%"
            maxW="md"
            bg="white"
          >
            <Text fontSize="2xl" fontWeight="bold">
              {question.question}
            </Text>
            <VStack spacing={3}>
              {question.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleOptionChange(question.id, option)}
                  colorScheme={
                    feedback[question.id] === "correct" &&
                    answers[question.id] === option
                      ? "green"
                      : feedback[question.id] === "incorrect" &&
                        answers[question.id] === option
                      ? "red"
                      : "blue"
                  }
                  variant={
                    answers[question.id] === option ? "solid" : "outline"
                  }
                  leftIcon={
                    feedback[question.id] === "correct" &&
                    answers[question.id] === option ? (
                      <CheckIcon />
                    ) : feedback[question.id] === "incorrect" &&
                      answers[question.id] === option ? (
                      <CloseIcon />
                    ) : null
                  }
                  width="100%"
                >
                  {option}
                </Button>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
}

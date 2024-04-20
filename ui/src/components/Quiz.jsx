import React from "react";
import {
  ChakraProvider,
  extendTheme,
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
        bg: "gray.100",
        color: "black",
      },
    },
  },
});

// QuizButton component
const QuizButton = ({
  questionId,
  option,
  isCorrect,
  isSelected,
  handleOptionChange,
}) => {
  let colorScheme = "gray"; // default color
  if (isSelected) {
    colorScheme = isCorrect ? "green" : "red";
  }

  const icon = isSelected ? isCorrect ? <CheckIcon /> : <CloseIcon /> : null;
  const displayText = isSelected
    ? isCorrect
      ? "Correct!"
      : "Incorrect!"
    : option;

  return (
    <Button
      onClick={() => handleOptionChange(questionId, option)}
      colorScheme={colorScheme}
      variant="solid"
      leftIcon={icon}
      width="100%"
    >
      {displayText}
    </Button>
  );
};

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
    <ChakraProvider theme={theme}>
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
                  <QuizButton
                    key={option}
                    questionId={question.id}
                    option={option}
                    isCorrect={
                      feedback[question.id] === "correct" &&
                      answers[question.id] === option
                    }
                    isSelected={answers[question.id] === option}
                    handleOptionChange={handleOptionChange}
                  />
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

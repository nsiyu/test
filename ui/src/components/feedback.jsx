import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  IconButton,
  useColorModeValue,
  Progress,
  Button,
  Center,
  HStack,
} from "@chakra-ui/react";
import Confetti from "react-confetti";
import { FaAngleDown, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const QuizFeedback = () => {
  const navigate = useNavigate();

  const quizData = [
    {
      question:
        "What are the advantages of using the iterative method for dynamic programming?",
      correctAnswer: "Paris",
      explanation: "Paris is the capital of France.",
      correct: "correct",
      userAnswer:
        "A recursive method for dynamic programming is advantageous because it uses less memory than iterative solutions.",
    },
    {
      question:
        "What is a disadvantage of using the iterative method for dynamic programming?",
      correctAnswer: "Harper Lee",
      explanation: "Harper Lee wrote 'To Kill a Mockingbird'.",
      correct: "correct",
      userAnswer:
        "A disadvantage of using the iterative method for dynamic programming is that it can be less intuitive and harder to conceptualize than the recursive approach, especially for complex problems.",
    },
    {
      question:
        "What is a advantage of using the recursive method for dynamic programming?",
      correctAnswer:
        "A major advantage of using the recursive method for dynamic programming is its intuitive breakdown of complex problems into simpler subproblems, enhancing code clarity and reducing redundant calculations with memoization.",
      explanation:
        "is incorrect because recursive solutions can actually use more memory due to the overhead of maintaining a call stack. Each recursive call adds a layer to the stack, leading to higher memory usage compared to iterative solutions, which typically use loops and a limited number of variables for more efficient memory management",
      correct:
        "NO",
      userAnswer:
        "A recursive method for dynamic programming is advantageous because it uses less memory than iterative solutions.",
    },
    {
      question:
        "What are the disadvantages of using the recursive method for dynamic programming?",
      correctAnswer: "Harper Lee",
      explanation: "Harper Lee wrote 'To Kill a Mockingbird'.",
      correct: "correct",
      userAnswer:
        "A recursive method for dynamic programming is advantageous because it uses less memory than iterative solutions.",
    },
    {
      question:
        "Is the order of states visited important when using the iterative method?",
      correctAnswer:
        "Yes, the order of states visited is important when using the iterative method in dynamic programming. In the bottom-up approach, you must solve smaller subproblems first to ensure that their solutions are available when solving larger, dependent subproblems. ",
      explanation:
        "This is incorrect because the order is crucial; the iterative approach requires solving smaller subproblems first. Visiting states out of order can lead to solving problems before their dependencies are resolved, resulting in incorrect or inefficient solutions.",
      correct: "no",
      userAnswer:
        "No, the order of states visited is not important when using the iterative method in dynamic programming",
    },
  ];

  const themeColor = useColorModeValue("primary", "primaryDark");
  const [reviewedQuestions, setReviewedQuestions] = useState(
    Array(quizData.length).fill(false)
  );
  const [confettiActive, setConfettiActive] = useState(false);

  const toggleReview = (index) => {
    setReviewedQuestions((prev) => {
      const newReviewedQuestions = [...prev];
      newReviewedQuestions[index] = !newReviewedQuestions[index];
      return newReviewedQuestions;
    });
  };

  const totalQuestions = quizData.length;
  const reviewedCount = reviewedQuestions.filter((reviewed) => reviewed).length;
  const progress = (reviewedCount / totalQuestions) * 100;

  const allQuestionsReviewed = reviewedQuestions.every((reviewed) => reviewed);

  useEffect(() => {
    if (allQuestionsReviewed) {
      setConfettiActive(true);
      setTimeout(() => {
        setConfettiActive(false);
      }, 2500);
    }
  }, [allQuestionsReviewed]);

  const handleNextClick = () => {
    navigate("/studyplan");
  };

  return (
    <VStack spacing={6} align="stretch" p={5}>
      <Heading as="h1" size="xl">
        Quiz Feedback
      </Heading>
      <Box position="sticky" top="0" zIndex="1" width="100%">
        <Progress value={progress} />
      </Box>
      <Box>
        {quizData.map((question, index) => (
          <Accordion allowToggle key={index}>
            <AccordionItem>
              <h2>
                <AccordionButton onClick={() => toggleReview(index)}>
                  <Box flex="1" textAlign="left">
                    {`Question ${index + 1}: ${question.question}`}
                    {question.correct === "correct" ? (
                      <Text color="green.500" ml={2}>
                        Correct ✔
                      </Text>
                    ) : (
                      <Text color="red.500" ml={2}>
                        Wrong{" "}
                        <Text as="spin" fontWeight="black">
                          X
                        </Text>
                      </Text>
                    )}
                  </Box>
                  <IconButton
                    aria-label="Expand"
                    icon={<FaAngleDown />}
                    bg={themeColor}
                    color="themeColor"
                  />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text color={question.correct == "correct" ? "green" : "red"}>
                  Your Answer:{" "}
                  <Text as="spin" color={"black"}>
                    {question.userAnswer}
                  </Text>
                </Text>
                {question.correct == "correct" ? (
                  <></>
                ) : (
                  <Text color={"green"}>
                    Correct Answer:{" "}
                    <Text as="spin">{question.correctAnswer}</Text>
                  </Text>
                )}

                {question.correct == "correct" ? (
                  <></>
                ) : (
                  <>
                    <Text color="red.500">Wrong...</Text>
                    <Text>Explanation: {question.explanation}</Text>
                    <ReactPlayer
                      url="https://storage.googleapis.com/klap-renders/f6b71095-2a6d-4d7a-8b42-336e204c8ee7-cea9f61f-309d-4274-a7db-945b6a2f3305.mp4"
                      controls
                      width={"40"}
                    />
                  </>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
        {allQuestionsReviewed && (
          <Center mt={4}>
            <Button
              variant="solid"
              colorScheme="pink"
              size="lg"
              onClick={handleNextClick}
            >
              Next
            </Button>
          </Center>
        )}
      </Box>
      {confettiActive && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          zIndex="999"
        >
          <Confetti />
        </Box>
      )}
    </VStack>
  );
};

export default QuizFeedback;

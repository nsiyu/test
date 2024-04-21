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
  AspectRatio,
  Progress,
  Button,
  Center,
} from "@chakra-ui/react";
import Confetti from "react-confetti";
import { FaAngleDown, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const QuizFeedback = () => {
  const navigate = useNavigate();
  const quizData = [
    {
      text: "What is the capital of France?",
      correctAnswer: "Paris",
      explanation: "Paris is the capital of France.",
    },
    {
      text: "Who wrote 'To Kill a Mockingbird'?",
      correctAnswer: "Harper Lee",
      explanation: "Harper Lee wrote 'To Kill a Mockingbird'.",
    },
  ];

  const userAnswers = ["Paris", "J.K. Rowling"];

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
                    {`Question ${index + 1}: ${question.text}`}
                    {userAnswers[index] === question.correctAnswer ? (
                      <Text color="green.500" ml={2}>
                        {" "}
                        (Right)
                      </Text>
                    ) : (
                      <Text color="red.500" ml={2}>
                        {" "}
                        (Wrong)
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
                <Text>Your Answer: {userAnswers[index]}</Text>
                <Text>Correct Answer: {question.correctAnswer}</Text>
                {userAnswers[index] === question.correctAnswer ? (
                  <Text color="green.500">Correct!</Text>
                ) : (
                  <>
                    <Text color="red.500">Wrong...</Text>
                    <Text>Explanation: {question.explanation}</Text>
                    {/* Video Embed */}
                    <AspectRatio ratio={16 / 9} mt={4}>
                      <iframe
                        title="Embedded Video"
                        width="480" // Adjust the width as needed
                        height="270" // Adjust the height as needed
                        src="https://www.youtube.com/embed/hMMKo79SHFE"
                        allowFullScreen
                      ></iframe>
                    </AspectRatio>
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

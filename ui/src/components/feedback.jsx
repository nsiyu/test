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
  const [quizData, setFeedback] = useState([]);

  useEffect(() => {
    // Fetch feedback data from the server
    const fetchFeedback = async () => {
      const response = await fetch("http://localhost:3000//feedback");
      const data = await response.json();
      setFeedback(data); // Set the fetched data to state
      console.log(data);
    };

    fetchFeedback();
  }, []);

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
                    {question.result === "correct" ? (
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
                <Text color={question.result == "correct" ? "green" : "red"}>
                  Your Answer:{" "}
                  <Text as="spin" color={"black"}>
                    {question.answer}
                  </Text>
                </Text>
                {question.result == "correct" ? <></> : <></>}

                {question.result == "correct" ? (
                  <></>
                ) : (
                  <>
                    <Text>Explanation: {question.feedback}</Text>
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

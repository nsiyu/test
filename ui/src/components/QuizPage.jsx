import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const QuizPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3000/questions");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(data);
        // Assuming each object in the array has a 'value' key
        const valueArray = data.map((item) => item.question);

        setQuestion(valueArray);
        console.log(valueArray);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleSubmit = () => {
    console.log("Answers:", answers);

    navigate("/feedback", { state: { userAnswers: answers } });
    toast({
      title: "Quiz submitted",
      description: "Thank you for submitting your answers!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Center h="100vh">
      <Box w="80%" maxW="600px">
        <VStack spacing={8}>
          <Heading textAlign="center">Quiz Time!</Heading>
          {questions.map((question, index) => (
            <QuestionInput
              key={index}
              question={question}
              onChange={(answer) => handleAnswerChange(question, answer)}
            />
          ))}
          <Button onClick={handleSubmit}>Submit</Button>
        </VStack>
      </Box>
    </Center>
  );
};

const QuestionInput = ({ question, onChange }) => {
  return (
    <Box w="100%">
      <Text mb={"0.3em"}>{question}</Text>
      <Input
        placeholder={`Enter your answer`}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
};

export default QuizPage;

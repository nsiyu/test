import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Flex,
  Tooltip,
  Divider,
  Text,
  RadioGroup,
  Radio,
  Stack,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function EducationForm() {
  const [educationLevel, setEducationLevel] = useState("");
  const [completionTime, setCompletionTime] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [studyMethod, setStudyMethod] = useState("");
  const [learningPreference, setLearningPreference] = useState("");
  const [motivationLevel, setMotivationLevel] = useState("");
  const [studyEnvironment, setStudyEnvironment] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    toast({
      title: "Preferences Saved",
      description: "Your study preferences have been submitted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/studyplan");
  };

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      direction="column"
      p={4}
    >
      <VStack spacing={4} align="stretch" w="full" maxW="md">
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          bg="white"
          w="full"
        >
          <Heading mb={6} textAlign="center">
            Education Preferences
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="educationLevel" isRequired mb={6}>
              <FormLabel>I am currently a</FormLabel>
              <Input
                variant="flushed"
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
                size="lg"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              />
            </FormControl>

            <Divider my={4} />

            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Time Management
            </Text>
            <HStack spacing={4}>
              <FormControl id="completionTime" isRequired flex={1}>
                <FormLabel>
                  How much time do you want to allocate for completing the
                  content?
                </FormLabel>
                <Input
                  variant="flushed"
                  focusBorderColor="blue.500"
                  errorBorderColor="red.500"
                  size="lg"
                  value={completionTime}
                  onChange={(e) => setCompletionTime(e.target.value)}
                />
              </FormControl>
              <FormControl id="studyTime" isRequired flex={1}>
                <FormLabel>
                  How many hours per week can you commit to studying?
                </FormLabel>
                <Input
                  variant="flushed"
                  focusBorderColor="blue.500"
                  errorBorderColor="red.500"
                  size="lg"
                  value={studyTime}
                  onChange={(e) => setStudyTime(e.target.value)}
                />
              </FormControl>
            </HStack>

            <Divider my={4} />

            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Study Methods
            </Text>
            <FormControl id="studyMethod" isRequired mb={4}>
              <FormLabel>
                What method do you prefer to use for studying?
              </FormLabel>
              <Input
                variant="flushed"
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
                size="lg"
                value={studyMethod}
                onChange={(e) => setStudyMethod(e.target.value)}
              />
            </FormControl>
            <FormControl id="learningPreference" isRequired mb={4}>
              <FormLabel>What is your preferred learning style?</FormLabel>
              <RadioGroup
                onChange={setLearningPreference}
                value={learningPreference}
              >
                <Stack direction="row">
                  <Radio value="visual">Visual</Radio>
                  <Radio value="auditory">Auditory</Radio>
                  <Radio value="kinesthetic">Kinesthetic</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <Divider my={4} />

            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Additional Preferences
            </Text>
            <FormControl id="motivationLevel" isRequired mb={4}>
              <FormLabel>What motivates you to study?</FormLabel>
              <Input
                variant="flushed"
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
                size="lg"
                value={motivationLevel}
                onChange={(e) => setMotivationLevel(e.target.value)}
              />
            </FormControl>
            <FormControl id="studyEnvironment" isRequired mb={8}>
              <FormLabel>
                What kind of environment do you prefer for studying?
              </FormLabel>
              <Input
                variant="flushed"
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
                size="lg"
                value={studyEnvironment}
                onChange={(e) => setStudyEnvironment(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" size="lg" isFullWidth>
              Submit Preferences
            </Button>
          </form>
        </Box>
      </VStack>
    </Flex>
  );
}

export default EducationForm;

import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  useColorModeValue,
  useColorMode,
  FormControl,
  FormLabel,
  Heading,
  Flex,
  IconButton,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function EducationForm() {
  const [educationLevel, setEducationLevel] = useState("");
  const [completionTime, setCompletionTime] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [studyMethod, setStudyMethod] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ educationLevel, completionTime, studyTime, studyMethod });
    navigate("/studyplan");
  };

  const bgBoxColor = useColorModeValue("white", "gray.800");
  const boxShadowColor = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(256, 256, 256, 0.1)"
  );

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.900")}
      direction="column"
      p={4}
    >
      <Tooltip label="Toggle Dark Mode" hasArrow placement="left">
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          isRound
          size="lg"
          alignSelf="flex-end"
          onClick={toggleColorMode}
          mb={6}
        />
      </Tooltip>
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius="lg"
        boxShadow={`0 4px 6px -1px ${boxShadowColor}`} // Corrected syntax for boxShadow
        bg={bgBoxColor}
        width="full"
      >
        <Heading mb={6} textAlign="center">
          Education Preferences
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="educationLevel" isRequired mb={6}>
            <FormLabel>I am currently a</FormLabel>
            <Input
              variant="filled"
              focusBorderColor="blue.500"
              errorBorderColor="red.500"
              size="lg"
              bg={useColorModeValue("gray.100", "gray.700")}
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
            />
          </FormControl>

          <Divider my={4} />

          <FormControl id="completionTime" isRequired mb={6}>
            <FormLabel>I want to finish the content in</FormLabel>
            <Input
              variant="filled"
              focusBorderColor="blue.500"
              errorBorderColor="red.500"
              size="lg"
              bg={useColorModeValue("gray.100", "gray.700")}
              value={completionTime}
              onChange={(e) => setCompletionTime(e.target.value)}
            />
          </FormControl>

          <Divider my={4} />

          <FormControl id="studyTime" isRequired mb={6}>
            <FormLabel>I prefer to study (hours per week)</FormLabel>
            <Input
              variant="filled"
              focusBorderColor="blue.500"
              errorBorderColor="red.500"
              size="lg"
              bg={useColorModeValue("gray.100", "gray.700")}
              value={studyTime}
              onChange={(e) => setStudyTime(e.target.value)}
            />
          </FormControl>

          <Divider my={4} />

          <FormControl id="studyMethod" isRequired mb={8}>
            <FormLabel>By using</FormLabel>
            <Input
              variant="filled"
              focusBorderColor="blue.500"
              errorBorderColor="red.500"
              size="lg"
              bg={useColorModeValue("gray.100", "gray.700")}
              value={studyMethod}
              onChange={(e) => setStudyMethod(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" size="lg" isFullWidth>
            Submit Preferences
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default EducationForm;

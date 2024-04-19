import React from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  useTheme,
  Icon,
  SimpleGrid,
  Progress,
  Badge,
} from "@chakra-ui/react";
import { AiOutlineCloudUpload, AiOutlineBulb } from "react-icons/ai";
import LearningEventsList from "./LearningEventList";
import Upload from "./Upload";
const HomePage = () => {
  const theme = useTheme();

  const handleUploadClick = () => {};
  const handleLearnClick = () => {};

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setIsProcessed(false);
    setScannedResult("Scanned successfully!");
  };

  const handleProcessing = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsProcessed(true);
    }, 2000);
  };

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <Box bg={theme.colors.brand[50]} minH="100vh" p={10}>
      <Upload></Upload>
      <VStack spacing={8} justifyContent="center" alignItems="center">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%">
          <Flex
            direction="column"
            align="center"
            p={8}
            bg={theme.colors.white}
            boxShadow={theme.shadows.md}
            rounded="xl"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: theme.shadows.lg,
            }}
            transition="transform .2s, box-shadow .2s"
            role="group"
            onClick={handleUploadClick}
          >
            <Icon
              as={AiOutlineCloudUpload}
              w={16}
              h={16}
              color={theme.colors.brand[700]}
            />
            <Text mt={4} fontSize="2xl" fontWeight="bold">
              Upload Syllabus
            </Text>
            <Text my={2}>Get your personalized learning path</Text>
            <Button colorScheme="blue" variant="solid">
              Upload Now
            </Button>
          </Flex>

          {/* Learn a Concept Box */}
          <Flex
            direction="column"
            align="center"
            p={8}
            bg={theme.colors.white}
            boxShadow={theme.shadows.md}
            rounded="xl"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: theme.shadows.lg,
            }}
            transition="transform .2s, box-shadow .2s"
            role="group"
            onClick={handleLearnClick}
          >
            <Icon
              as={AiOutlineBulb}
              w={16}
              h={16}
              color={theme.colors.brand[700]}
            />
            <Text mt={4} fontSize="2xl" fontWeight="bold">
              Learn a Concept
            </Text>
            <Text my={2}>Dive into new knowledge</Text>
            <Button colorScheme="blue" variant="solid">
              Start Learning
            </Button>
          </Flex>
        </SimpleGrid>
        <LearningEventsList />
      </VStack>
    </Box>
  );
};

export default HomePage;

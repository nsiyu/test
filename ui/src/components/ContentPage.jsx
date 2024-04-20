import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Container,
  Heading,
  SimpleGrid,
  Progress,
  List,
  ListItem,
  ListIcon,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { FaGoogleDrive, FaUpload } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import Upload from "./Upload.jsx";

function App() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState([]);
  const toast = useToast();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:3000/upload-pdf", {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setExtractedText(data.text);
        toast({
          title: "File uploaded successfully",
          description: "Text has been extracted from the PDF.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Flex direction="row" justify="space-between" align="start">
        <VStack spacing={4} align="stretch" flex="1">
          <Heading as="h1" size="md" mb={0}>
            Upload Additional Notes
          </Heading>
          <Box w="full" p={4} borderWidth="1px" borderRadius="lg">
            <VStack spacing={4}>
              <HStack w="full" alignItems="center" spacing={4}>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  size="lg"
                  placeholder="Upload PDF"
                  accept="application/pdf"
                />
                <Button
                  colorScheme="blue"
                  leftIcon={<FaUpload />}
                  onClick={handleFileUpload}
                >
                  Upload PDF
                </Button>
              </HStack>
              {/* Displaying the extracted text */}
              {extractedText.length > 0 && (
                <Box
                  overflowY="auto"
                  maxH="200px"
                  p={4}
                  mt={4}
                  borderWidth="1px"
                >
                  {extractedText.map((pageText, index) => (
                    <Text key={index} mb={2}>
                      {pageText || "No text found on this page."}
                    </Text>
                  ))}
                </Box>
              )}
            </VStack>
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
}

export default App;

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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
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
              <HStack w="full" alignItems="center" spacing={4}></HStack>
              <Upload></Upload>
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

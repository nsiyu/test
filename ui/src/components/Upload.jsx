import React, { useState } from "react";
import { Button, Spinner, useToast, Box, Text, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FileUploadButton = () => {
  const [file, setFile] = useState(null);
  const [buttonState, setButtonState] = useState("upload"); // States: 'upload', 'submit', 'loading', 'continue'
  const toast = useToast();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setButtonState("submit");
  };

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "No file selected",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setButtonState("loading");
    setTimeout(() => {
      setButtonState("continue");
    }, 2000); // Simulate file processing time
  };

  const handleContinue = () => {
    navigate('/userinfo')
  };

  return (
    <Box display="flex" alignItems="center" gap="4">
      {buttonState === "upload" && (
        <>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button as="span" colorScheme="teal">
              Upload File
            </Button>
          </label>
        </>
      )}
      {buttonState === "submit" && (
        <Box>
          <Center>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit File
            </Button>
          </Center>
          <Center>{file && <Text fontSize="md">{file.name}</Text>}</Center>
        </Box>
      )}
      {buttonState === "loading" && (
        <Box>
          <Center>
            <Button isLoading spinner={<Spinner />} colorScheme="blue">
              Processing...
            </Button>
          </Center>
          <Center>
            <Text fontSize="md">{file.name}</Text>
          </Center>
        </Box>
      )}
      {buttonState === "continue" && (
        <Button colorScheme="green" onClick={handleContinue}>
          Continue
        </Button>
      )}
    </Box>
  );
};

export default FileUploadButton;

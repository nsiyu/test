import React, { useState } from "react";
import { Button, Spinner, useToast, Box, Text, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FileUploadButton = () => {
  const [buttonState, setButtonState] = useState("upload"); // States: 'upload', 'submit', 'loading', 'continue'
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setButtonState("submit");
  };

  const handleSubmit = async () => {
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
        console.log(data.text);
      });
    setButtonState("loading");
    setTimeout(() => {
      setButtonState("continue");
    }, 1000);
    console.log(extractedText);
  };

  const handleContinue = () => {
    navigate("/userinfo");
  };

  return (
    <Box display="flex" alignItems="center" gap="4" >
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
              Upload PDF
            </Button>
          </label>
        </>
      )}
      {buttonState === "submit" && (
        <Box >
          <Center >
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

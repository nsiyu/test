import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  useTheme,
  Icon,
  Button, // Import Button component
} from "@chakra-ui/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFileEarmarkCode } from "react-icons/bs"; // Import PowerPoint icon
import Upload from "./Upload";

const HomePage = () => {
  const theme = useTheme();
  return (
    <Box bg={theme.colors.brand[50]} p={10}>
      <VStack spacing={8} justifyContent="center" alignItems="center">
        <Flex justifyContent="center" width="100%">
          <Flex
            direction="column"
            align="center"
            p={8}
            bg={theme.colors.white}
            boxShadow={theme.shadows.md}
            rounded="xl"
            transition="transform .2s, box-shadow .2s"
            role="group"
            w={"50vw"}
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
            <Upload />
          </Flex>
        </Flex>
        {/* New Box for Uploading PowerPoint */}
        <Flex justifyContent="center" width="100%">
          <Flex
            direction="column"
            align="center"
            p={8}
            bg={theme.colors.white}
            boxShadow={theme.shadows.md}
            rounded="xl"
            transition="transform .2s, box-shadow .2s"
            role="group"
            w={"50vw"}
          >
            <Icon
              as={BsFileEarmarkCode} // Icon for PowerPoint
              w={16}
              h={16}
              color={theme.colors.brand[700]}
            />
            <Text mt={4} fontSize="2xl" fontWeight="bold">
              Upload PowerPoint
            </Text>
            <Text my={2}>Get your customized presentation</Text>
            {/* Button for uploading PowerPoint */}
            <Button colorScheme="blue">Upload File</Button>
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
};

export default HomePage;

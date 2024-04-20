import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

const Title = () => {
  const words = ["Lecture.", "Syllabus.", "Textbook.", "Notes."];
  const [index, setIndex] = useState(0); // Current index for the words array
  const [subIndex, setSubIndex] = useState(0); // Current index for the substring of the word
  const [isDeleting, setIsDeleting] = useState(false); // State to track whether currently deleting

  useEffect(() => {
    let timeoutId;

    if (isDeleting) {
      if (subIndex === 0) {
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 1200); // Wait time before the next word starts typing
      } else {
        timeoutId = setTimeout(() => {
          setSubIndex((prevSubIndex) => prevSubIndex - 1);
        }, 60); // Speed of deleting each character
      }
    } else {
      if (subIndex === words[index].length + 1) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause before starting to delete
      } else {
        timeoutId = setTimeout(() => {
          setSubIndex((prevSubIndex) => prevSubIndex + 1);
        }, 120); // Speed of typing each character
      }
    }

    return () => clearTimeout(timeoutId);
  }, [subIndex, index, words, isDeleting]);

  // Determine when to blink the cursor
  const blinkCursor = subIndex === 0 || subIndex === words[index].length + 1;
  const cursorColor = blinkCursor ? "whiteAlpha.500" : "transparent"; // Control cursor blink visibility

  return (
    <Box>
      <Text as="span" color="blue.600">
        {words[index].substring(0, subIndex)}
      </Text>
      <Text as="span" color={cursorColor} className="blink">
        |
      </Text>
    </Box>
  );
};

export default Title;

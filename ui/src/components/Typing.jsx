import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

const Title = () => {
  const word = "Dynamic programming is a powerful problem-solving technique used in computer science and mathematics to efficiently solve problems by breaking them down into smaller overlapping subproblems. Unlike traditional brute-force methods that solve the same subproblems repeatedly, dynamic programming optimizes efficiency by storing the solutions to subproblems in a table or array and reusing them when needed. This approach significantly reduces redundant computations, resulting in faster algorithms. Dynamic programming is widely applied in various domains such as optimization, graph algorithms, sequence alignment, and more. Its versatility and effectiveness make it a fundamental tool for tackling complex computational problems with optimal time and space complexity."; // Single word to be typed out
  const [subIndex, setSubIndex] = useState(0); // Current index for the substring of the word

  useEffect(() => {
    let timeoutId;

    // Check if the entire word has been typed out
    if (subIndex < word.length) {
      // If not, continue typing
      timeoutId = setTimeout(() => {
        setSubIndex((prevSubIndex) => prevSubIndex + 1);
      }, 120); // Speed of typing each character
    }

    // Clear the timeout when the component unmounts or the word is fully typed
    return () => clearTimeout(timeoutId);
  }, [subIndex, word]);

  // Determine when to blink the cursor
  const blinkCursor = subIndex === word.length;
  const cursorColor = blinkCursor ? "whiteAlpha.500" : "transparent"; // Control cursor blink visibility

  return (
    <Box>
      <Text as="span" color="blue.600">
        {word.substring(0, subIndex)}
      </Text>
      <Text as="span" color={cursorColor} className="blink">
        |
      </Text>
    </Box>
  );
};

export default Title;

import React, { useState } from 'react';
import { Box, Button, VStack, Text, Container, Heading, SimpleGrid } from '@chakra-ui/react';

const flashcardsData = [
  { term: "React", definition: "A JavaScript library for building user interfaces." },
  { term: "Chakra UI", definition: "A simple, modular and accessible component library that gives you the building blocks you need to build your React applications." },
  { term: "Node.js", definition: "A JavaScript runtime built on Chrome's V8 JavaScript engine." }
];

function Flashcard({ card, onClick }) {
  const [showDefinition, setShowDefinition] = useState(false);

  return (
    <Box
      p={6}
      w={["300px", "400px"]}
      h="250px"
      borderWidth="1px"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      bg={showDefinition ? "teal.100" : "gray.100"}
      onClick={() => setShowDefinition(!showDefinition)}
      cursor="pointer"
      boxShadow="md"
    >
      <Text fontSize="2xl" fontWeight="bold">{showDefinition ? card.definition : card.term}</Text>
    </Box>
  );
}

function Flashcards() {
  const [viewMode, setViewMode] = useState('single');
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % flashcardsData.length);
  };

  return (
    <Container maxW="container.xl" p={4} centerContent>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">Study Flashcards</Heading>

        {viewMode === 'single' ? (
          <VStack spacing={4}>
            <Flashcard card={flashcardsData[current]} />
            <Button colorScheme="teal" onClick={handleNext}>Next Card</Button>
          </VStack>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing="20px">
            {flashcardsData.map((card, index) => (
              <Flashcard key={index} card={card} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}

export default Flashcards;

import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box 
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, blue.400, purple.500)"
    >
      <VStack 
        bg="white" 
        p={8} 
        borderRadius="lg" 
        boxShadow="lg" 
        spacing={6} 
        textAlign="center"
      >
        <Heading>Welcome to License Manager</Heading>
        <Text>Keep track of your licenses with ease.</Text>
        <Button colorScheme="blue" onClick={() => navigate("/dashboard")}>
          Get Started
        </Button>
      </VStack>
    </Box>
  );
};

export default Welcome;

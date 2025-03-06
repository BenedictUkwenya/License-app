import { Box, Button, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" p={4}>
      <VStack spacing={6} textAlign="center">
        <Heading size="2xl">Welcome to the Licenses App</Heading>
        <Text fontSize="lg">Manage your licenses easily and never miss an expiration date.</Text>
        
        <HStack spacing={4}>
          <Button colorScheme="blue" size="lg" onClick={() => navigate("/signup")}>
            Get Started
          </Button>
          <Button colorScheme="gray" size="lg" variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Welcome;

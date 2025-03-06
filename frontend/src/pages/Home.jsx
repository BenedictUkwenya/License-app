import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Box textAlign="center" py={{ base: 5, md: 10 }} px={{ base: 3, md: 6 }}>
      <Heading as="h1" size={{ base: "lg", md: "xl" }} mb={4}>
        Welcome to License Manager{user ? `, ${user.name}` : ""}
      </Heading>
      <Text fontSize={{ base: "md", md: "lg" }} mb={6}>
        Manage and track your licenses efficiently.
      </Text>
      <VStack spacing={4}>
        <Button as={Link} to="/addlicense" colorScheme="blue" size={{ base: "md", md: "lg" }}>
          Add a License
        </Button>
        <Button as={Link} to={`/dashboard/${user ? user._id : ""}`} colorScheme="teal" size={{ base: "md", md: "lg" }}>
          View Dashboard
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;

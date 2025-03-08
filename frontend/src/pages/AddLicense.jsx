import { useState } from "react";
import { Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddLicense = () => {
  const [title, setTitle] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/licenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, expiryDate }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add license.");

      toast({
        title: "Success!",
        description: "License added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate(`/dashboard/${data._id}`);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW={{ base: "90%", md: "md" }} mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="black">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Enter license title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Expiry Date</FormLabel>
          <Input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </FormControl>

        <Button
          mt={6}
          colorScheme="teal"
          type="submit"
          isLoading={loading}
          loadingText="Adding..."
        >
          Add License
        </Button>
      </form>
    </Box>
  );
};

export default AddLicense;

import { useEffect, useState } from "react";
import { Box, Heading, Text, SimpleGrid, Badge, Spinner, Alert, AlertIcon, Flex, Button, Stack } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/licenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch licenses.");
      setLicenses(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteLicense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`api/licenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete license.");
      setLicenses(licenses.filter((license) => license._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateLicense = (id) => {
    console.log("Update license", id);
    // Implement update logic here (e.g., open a modal with a form)
  };

  const getStatus = (expiryDate) => {
    const today = new Date();
    const expiration = new Date(expiryDate);
    const diffDays = Math.ceil((expiration - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { text: "Expired", color: "red" };
    if (diffDays <= 7) return { text: "Expiring", color: "orange" };
    return { text: "Active", color: "green" };
  };

  return (
    <Box display="flex" minH="100vh" bg="gray.50">
      <Sidebar />
      <Box flex="1" ml={{ base: 0, md: "250px" }} p={6}>
        <Heading mb={4} color="teal.600">Your Licenses</Heading>
        <Text mb={6} color="gray.600">Manage and monitor your license portfolio.</Text>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="100%">
            <Spinner size="xl" />
          </Flex>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : licenses.length === 0 ? (
          <Text>No licenses found.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {licenses.map((license) => {
              const status = getStatus(license.expiryDate);
              return (
                <Box key={license._id} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
                  <Heading size="md" mb={2} color="teal.700">{license.title}</Heading>
                  <Text fontSize="sm" color="gray.500">
                    Expires on {new Date(license.expiryDate).toDateString()}
                  </Text>
                  <Badge colorScheme={status.color} mt={2}>{status.text}</Badge>
                  <Stack direction="row" mt={4} spacing={4}>
                    <Button colorScheme="blue" size="sm" onClick={() => updateLicense(license._id)}>Update</Button>
                    <Button colorScheme="red" size="sm" onClick={() => deleteLicense(license._id)}>Delete</Button>
                  </Stack>
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;

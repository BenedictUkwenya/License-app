import { Box, Heading, Switch, FormControl, FormLabel, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <Box p={5}>
      <Heading mb={4}>Settings</Heading>
      <VStack spacing={4} align="start">
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Dark Mode</FormLabel>
          <Switch isChecked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Enable Notifications</FormLabel>
          <Switch isChecked={notifications} onChange={() => setNotifications(!notifications)} />
        </FormControl>
        <Text fontSize="sm" color="gray.500">
          Customize your preferences to enhance your experience.
        </Text>
      </VStack>
    </Box>
  );
};

export default Settings;

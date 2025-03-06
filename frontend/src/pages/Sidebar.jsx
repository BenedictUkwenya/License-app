import { 
  Box, VStack, Text, Icon, useDisclosure, Drawer, DrawerBody, 
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button 
} from "@chakra-ui/react";
import { 
  FaHome, FaPlus, FaBell, FaCog, FaSignOutAlt, FaTachometerAlt, FaBars 
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Mobile Menu Button */}
      <Button 
        display={{ base: "block", md: "none" }} 
        onClick={onOpen} 
        position="fixed" 
        top="1rem" 
        left="1rem"
        paddingBottom="3rem"
        bg="transparent"
        zIndex="overlay"
        colorScheme="" // Change color scheme
      >
        <Icon as={FaBars} />
      </Button>

      {/* Desktop Sidebar */}
      <Box 
        w={{ base: "full", md: "250px" }} 
        h="100vh" 
        bg="gray.800" 
        color="white"
        p={5} 
        boxShadow="lg" 
        position="fixed"
        left="0"
        top="0"
        display={{ base: "none", md: "block" }}
      >
        <VStack align="start" spacing={5}>
          <NavLink to="/home" style={{ textDecoration: 'none' }}>
            <Text display="flex" alignItems="center" fontSize="lg" color="gray.300" _hover={{ color: "white" }}>
              <Icon as={FaHome} mr={3} /> Home
            </Text>
          </NavLink>

          <NavLink to style={{ textDecoration: 'none' }}>
            <Text display="flex" alignItems="center" fontSize="lg" color="gray.600" _hover={{ color: "white" }}>
              <Icon as={FaTachometerAlt} mr={3} /> Dashboard
            </Text>
          </NavLink>

          <NavLink to="/addlicense">
            <Text display="flex" alignItems="center" fontSize="lg" color="gray.300" _hover={{ color: "white" }}>
              <Icon as={FaPlus} mr={3} /> Add License
            </Text>
          </NavLink>

          <NavLink to="/notifications">
            <Text display="flex" alignItems="center" fontSize="lg" color="gray.300" _hover={{ color: "white" }}>
              <Icon as={FaBell} mr={3} /> Notifications
            </Text>
          </NavLink>

          <NavLink to="/settings">
            <Text display="flex" alignItems="center" fontSize="lg" color="gray.300" _hover={{ color: "white" }}>
              <Icon as={FaCog} mr={3} /> Settings
            </Text>
          </NavLink>

          <NavLink to="/logout">
            <Text display="flex" alignItems="center" fontSize="lg" color="red.500">
              <Icon as={FaSignOutAlt} mr={3} /> Logout
            </Text>
          </NavLink>
        </VStack>
      </Box>

      {/* Mobile Drawer Sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={5}>
              <NavLink to="/home" style={{ textDecoration: 'none' }} onClick={onClose}>
                <Text display="flex" alignItems="center" fontSize="lg" color="gray.300" _hover={{ color: "white" }}>
                  <Icon as={FaHome} mr={3} /> Home
                </Text>
              </NavLink>

              <NavLink to style={{ textDecoration: 'none' }} onClick={onClose}>
                <Text display="flex" alignItems="center" fontSize="lg" color="gray.600" _hover={{ color: "white" }}>
                  <Icon as={FaTachometerAlt} mr={3} /> Dashboard
                </Text>
              </NavLink>

              <NavLink to="/addlicense" onClick={onClose}>
                <Text display="flex" alignItems="center" fontSize="lg" color="gray.300" _hover={{ color: "white" }}>
                  <Icon as={FaPlus} mr={3} /> Add License
                </Text>
              </NavLink>

              <NavLink to="/notifications" onClick={onClose}>
                <Text display="flex" alignItems="center" fontSize="lg" color="gray.300" _hover={{ color: "white" }}>
                  <Icon as={FaBell} mr={3} /> Notifications
                </Text>
              </NavLink>

              <NavLink to="/settings" onClick={onClose}>
                <Text display="flex" alignItems="center" fontSize="lg" color="gray.300" _hover={{ color: "white" }}>
                  <Icon as={FaCog} mr={3} /> Settings
                </Text>
              </NavLink>

              <NavLink to="/logout" onClick={onClose}>
                <Text display="flex" alignItems="center" fontSize="lg" color="red.500">
                  <Icon as={FaSignOutAlt} mr={3} /> Logout
                </Text>
              </NavLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;

import React, { useContext } from "react";
import {
  Flex,
  Box,
  Button,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useTheme,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiLogIn,
  FiLogOut,
  FiCalendar,
  FiZap,
  FiUser,
  FiBookOpen,
} from "react-icons/fi"; // Import FiBookOpen icon
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Navbar = () => {
  const theme = useTheme();
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const bg = theme.colors.brand[50];
  const borderColor = theme.colors.gray[200];
  const iconColor = theme.colors.accent;
  const buttonTextColor = theme.colors.brand[900];
  const buttonHoverBg = theme.colors.accent;

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      justifyContent="space-between"
      padding={4}
      bg={bg}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      zIndex="1000"
    >
      <Box
        fontSize="xl"
        fontWeight="bold"
        letterSpacing="tight"
        onClick={() => navigate("/")}
        _hover={{ cursor: "pointer" }}
      >
        Learn.ai
      </Box>

      <Flex align="center">
        {isAuthenticated ? (
          <>
            <Button
              variant="ghost"
              onClick={() => navigate("/special-feature")}
              _hover={{ bg: buttonHoverBg }}
            >
              <Icon as={FiZap} color={iconColor} />
              <Text ml={2} color={iconColor}>
                42
              </Text>{" "}
              {/* Example streak count */}
            </Button>
            <Button
              leftIcon={<Icon as={FiCalendar} color={iconColor} />}
              variant="ghost"
              onClick={() => navigate("/calendar")}
              _hover={{ bg: buttonHoverBg }}
            >
              Calendar
            </Button>
            <Button
              leftIcon={<Icon as={FiBookOpen} color={iconColor} />}
              variant="ghost"
              onClick={() => navigate("/courses")}
              _hover={{ bg: buttonHoverBg }}
            >
              My Courses
            </Button>

            {/* Profile Dropdown */}
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<Icon as={FiUser} />}
                variant="outline"
                aria-label="Options"
                _hover={{ bg: buttonHoverBg }}
              />
              <MenuList>
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/settings")}>
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/");
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Button
            leftIcon={<Icon as={FiLogIn} color={iconColor} />}
            variant="outline"
            colorScheme="blue"
            onClick={() => navigate("/login")}
            color={buttonTextColor}
            _hover={{ bg: buttonHoverBg }}
          >
            Log in
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;

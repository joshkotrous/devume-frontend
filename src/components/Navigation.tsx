import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import React from "react";
import { SignOut } from "../hooks/Auth";
import { useNavigate } from "react-router-dom";
interface NavigationProps {
  isAuthenticated: boolean;
}
const Navigation: React.FC<NavigationProps> = ({ isAuthenticated }) => {
  const navigateTo = useNavigate();
  return (
    <Navbar>
      <NavbarBrand>
        <Link to="/">
          <h1 className="font-bold text-xl">Devumé</h1>
        </Link>
      </NavbarBrand>
      {isAuthenticated ? (
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <Avatar isBordered />
              </DropdownTrigger>
              <DropdownMenu
                onAction={async (key) => {
                  if (key === "sign-out") {
                    await SignOut();
                    navigateTo(0);
                  }
                  if (key === "my-profile") {
                    navigateTo("/" + localStorage.getItem("profileId"));
                  }
                }}
                aria-label="Action event example"
              >
                <DropdownItem key="my-profile">My Profile</DropdownItem>

                <DropdownItem key="sign-out">Sign Out</DropdownItem>
              </DropdownMenu>
            </Dropdown>{" "}
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            <Link color="primary" to="/login">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" to="/sign-up" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default Navigation;

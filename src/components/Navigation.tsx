import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <Navbar>
    <NavbarBrand>
      <Link to='/'>
        <h1 className="font-bold text-xl">Devumé</h1>
      </Link>
    </NavbarBrand>
    <NavbarContent justify="end">
      <NavbarItem className="lg:flex">
        <Link color="primary" to="/login">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" to="/sign-up" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
  )
}

export default Navigation
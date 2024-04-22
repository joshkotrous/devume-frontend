import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const Navigation = () => {
  return (
    <Navbar>
    <NavbarBrand>
      <a href='/'>
        <h1 className="font-bold text-xl">Devumé</h1>
      </a>
    </NavbarBrand>
    <NavbarContent justify="end">
      <NavbarItem className="lg:flex">
        <Link href="/login">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/sign-up" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
  )
}

export default Navigation
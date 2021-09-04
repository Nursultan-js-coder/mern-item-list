import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const AppNavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="p-3">
      <Navbar.Brand href="#">MERN TODO APP</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="#action1">Create</Nav.Link>
          <Nav.Link href="#action2">Items</Nav.Link>
          <Nav.Link style={{ marginLeft: 1000, fontWeight: 600 }} href="#">
            github
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavBar;

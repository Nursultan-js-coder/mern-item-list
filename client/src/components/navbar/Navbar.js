import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../store/actions/auth-action-creator";
import { connect } from "react-redux";
import AppModal from "../modals/modal";
import AppForm from "../forms/Form";
import { loginUser, registerUser } from "../../store/actions/auth";

const registerFormFields = [
  {
    placeholder: "Enter name",
    name: "name",
    type: "text",
  },
  {
    placeholder: "Enter email",
    name: "email",
    type: "email",
  },
  {
    placeholder: "Enter password",
    name: "password",
    type: "text",
  },
];

const loginFormFields = [
  {
    placeholder: "Enter email",
    name: "email",
    type: "email",
  },
  {
    placeholder: "Enter password",
    name: "password",
    type: "text",
  },
];

const AppNavBar = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowRegister, setModalShowRegister] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = props;
  const { user } = props;

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
          <div style={{ marginLeft: "900px" }}>
            {isAuthenticated ? (
              <>
                <span>
                  welcome <span style={{ marginRight: 10 }}>{user.name}</span>
                </span>

                <Button
                  variant="primary"
                  onClick={() => dispatch(userLoggedOut())}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  onClick={() => setModalShowRegister(true)}
                >
                  Register
                </Button>

                <AppModal
                  show={modalShowRegister}
                  onHide={() => setModalShowRegister(false)}
                  setModalShow={setModalShowRegister}
                  title="Registration Form"
                >
                  <AppForm
                    setModalShow={setModalShowRegister}
                    fields={registerFormFields}
                    action={registerUser}
                  />
                </AppModal>

                <Button
                  variant="primary"
                  style={{ marginLeft: 10 }}
                  onClick={() => setModalShow(true)}
                >
                  Login
                </Button>

                <AppModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  setModalShow={setModalShow}
                  title="Login Form"
                >
                  <AppForm
                    setModalShow={setModalShow}
                    fields={loginFormFields}
                    action={loginUser}
                  />
                </AppModal>
              </>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(AppNavBar);

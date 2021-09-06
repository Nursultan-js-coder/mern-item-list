import { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import AppNavBar from "./components/navbar/Navbar";
import ShoppingList from "./pages/shoppingList";
import { loadUser } from "./store/actions/auth";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      <AppNavBar />
      <Container className="p-3">
        <ShoppingList />
      </Container>
    </>
  );
}

export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button } from "react-bootstrap";
import AppNavBar from "./components/navbar/Navbar";
import ShoppingList from "./pages/shoppingList";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavBar />
        <Container className="p-3">
          <ShoppingList />
        </Container>
      </Provider>
    </>
  );
}

export default App;

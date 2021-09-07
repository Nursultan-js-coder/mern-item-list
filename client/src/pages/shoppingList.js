import React, { useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteItem, fetchItems, saveItem } from "../store/requests/item";
import AppForm from "../components/forms/Form";
import AppModal from "../components/modals/modal";

const itemFormFields = [
  {
    placeholder: "Enter name",
    name: "name",
    type: "text",
  },
];
const ShoppingList = (props) => {
  const { items, error, isAuthenticated, loading, deleteItem } = props;
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems);
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      {isAuthenticated && (
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add Item
        </Button>
      )}
      <AppModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Item Form"
      >
        <AppForm
          action={saveItem}
          fields={itemFormFields}
          setModalShow={setModalShow}
          title="Item Form"
        />
      </AppModal>
      <ListGroup className="mt-3">
        <TransitionGroup>
          {items &&
            items.map((item, index) => {
              return (
                <CSSTransition classNames="fade" timeout={500} key={index}>
                  <ListGroup.Item>
                    <div
                      className="item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>{item.name}</p>
                      {isAuthenticated && (
                        <Button
                          variant="danger"
                          onClick={() => dispatch(deleteItem(item._id))}
                        >
                          remove
                        </Button>
                      )}
                    </div>
                  </ListGroup.Item>
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      </ListGroup>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.item.entities,
    error: state.item.error,
    loading: state.item.loading,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // deleteItem: (id) => dispatch(itemDeleted(id)),
    deleteItem: (id) => deleteItem(id),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);

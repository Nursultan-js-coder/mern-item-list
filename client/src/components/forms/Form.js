import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { saveItem } from "../../store/requests/item";
import { useDispatch } from "react-redux";

const AppForm = (props) => {
  const [inputValues, setInputValues] = useState({});
  const { fields, title, action, setModalShow } = props;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    console.log("inputValues:", inputValues);
    e.preventDefault();
    dispatch(action(inputValues));
    setInputValues({});
    setModalShow(false);
  };
  const changeHandler = ({ target: { name, value } }) => {
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  return (
    <Form onSubmit={submitHandler}>
      {fields.map((field, index) => {
        return (
          <Form.Group key={index} className="mb-3" controlId="formBasicEmail">
            <Form.Label>{title}</Form.Label>
            <Form.Control
              type={field["type"]}
              placeholder={field["placeholder"]}
              value={inputValues[field["name"]] ?? ""}
              name={field["name"]}
              onChange={changeHandler}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        );
      })}

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveItem: (item) => saveItem(item),
  };
};

export default connect(null, mapDispatchToProps)(AppForm);

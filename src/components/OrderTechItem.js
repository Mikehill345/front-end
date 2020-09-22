import React, { useState, useEffect } from "react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import styled from "styled-components";

//component styling
const StyledDiv = styled.div`
  background-image: url("https://images.unsplash.com/photo-1505424297051-c3ad50b055ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80");
  background-size: cover;
  background-position: center;
  height: 1000px;
  background-repeat: no-repeat;
  select {
    width: 15%;
    padding: 12px 20px;
    margin: 8px 1%;
  }
  button {
    max-width: 292px;
    width: 200px;
    margin-top: 1%;
    margin-bottom: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 2px solid #fff;
    border-radius: 5px;
    background-color: #102542;
    transition: color 0.2s ease, background-color 0.2s ease;
    font-family: Inter, sans-serif;
    cursor: pointer;
    color: #f87060;
    font-size: 18px;
    line-height: 160%;
    font-weight: 700;
    text-decoration: none;
  }
  button:hover {
    background-color: #b3a394;
    color: #102542;
  }
`;

const initialFormValues = {
  dropdown: [],
  choice: 0,
};

const OrderTechItem = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const submit = (event) => {
    event.preventDefault();
    const order = {
      user_id: 1,
      item_id: formValues.choice,
    };
    axios
      .post("https://used-tech.herokuapp.com/api/orders", order)
      .then((res) => {
        console.log(res);
      })
      .catch();
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    axios
      .get("https://used-tech.herokuapp.com/api/items")
      .then((res) => {
        setFormValues({ ...formValues, dropdown: res.data });
      })
      .catch();
  }, []);

  return (
    <StyledDiv>
      <h2>Enter your details to order an item!</h2>
      <form onSubmit={submit}>
        <label>
          <strong>Choose an item:</strong>
        </label>
        <select name="choice" onChange={onChange}>
          {formValues &&
            formValues.dropdown.map((item) => {
              return <option value={item.id}>{item.item}</option>;
            })}
        </select>
        <button>Submit</button>
      </form>
    </StyledDiv>
  );
};

export default OrderTechItem;
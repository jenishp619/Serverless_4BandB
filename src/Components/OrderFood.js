import { ResetTvRounded } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

import React, { Component } from "react";
import { Login } from "./Login";

function OrderFood() {
  const initialValues = { description: "", quantity: "", date: "" };
  const [formValue, setFormValue] = useState(initialValues);

  const order_id = localStorage.getItem("order_id");
  const order_Item = localStorage.getItem("order_Item");
  const item_price = localStorage.getItem("item_price");
  var cust_id = localStorage.getItem("cust_id");

  const postOrder = `https://nbobbkh492.execute-api.us-east-1.amazonaws.com/foodadd`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validateOrder = (e) => {
    e.preventDefault();
    let order_Date = formValue.date;
    let Description = formValue.description;
    const article = {
      cust_id: cust_id,
      order_id: order_id,
      order_Item: order_Item,
      item_price: item_price,
      order_Date: order_Date,
      description: Description,
    };
    console.log(article);

    axios
      .post(
        "https://nbobbkh492.execute-api.us-east-1.amazonaws.com/foodadd",
        article
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          axios
            .post(
              "https://us-east1-norse-baton-356415.cloudfunctions.net/foodOrderPublish",
              article
            )
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                console.log("food ordered in google cloud");
                window.location.href = "/home";
              }
            })
            .catch(function (error) {
              alert("Error submitting order food");
              console.log("Exception occured");
              console.log(error);
            });
          // console.log(response.data.status);
         // window.location.href = "/home";
        }
      })
      .catch(function (error) {
        alert("Error submitting order food");
        console.log("Exception occured");
        console.log(error);
      });
  };
  var cust_id = localStorage.getItem("cust_id");
  console.log(cust_id);
  
  return cust_id === null? <Login/>:(
    <div>
      <h1>Confirm your order</h1>
      <form onSubmit={validateOrder}>
        <div>
          <label>
            Quantity:
            <input
              type="text"
              name="quantity"
              value={formValue.quantity}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Special Instruction:
            <input
              type="text"
              name="description"
              value={formValue.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date of Order:
            <input
              type="date"
              name="date"
              value={formValue.date}
              onChange={handleChange}
              required
            />
          </label>
          <button>Place Order</button>
        </div>
      </form>
    </div>
  );
}
export default OrderFood;

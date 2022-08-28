import React, { Component } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Login } from "./Login";


function GetFoodList() {
    const navigate = useNavigate();
    const [toDate, settoDate] = useState('')
    const [noBeds, setnoBeds] = useState('')
    const [fromDate, setfromDate] = useState('')
    const [foods, setFoods] = useState([]);

    //URL to fetch all the Menu's food.
    const url = "https://m3x3agebq7nq3b3chln3kdsnyq0coalo.lambda-url.us-east-1.on.aws/?TableName=food";
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = () => {
        axios.get(`${url}`)
            .then((response) => {
                const allData = response.data.Items;
                setFoods(allData);
                // setTempProfiles(allData);
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    const onClick = (e) => {
        e.preventDefault()
        if (toDate !== "" && noBeds !== "" && fromDate !== "") {

        }
        else {
            alert("Enter valid details")
        }
    }

    const onOrderClick = (food) => {
        return function () {
            let cust_id = localStorage.getItem("cust_id");
            let foodData = { "order_id": food.id, "order_Item": food.name, "cust_id": cust_id, "item_price": food.price }
            localStorage.setItem("fooddata", JSON.stringify(foodData));
            localStorage.setItem("order_id", food.id);
            localStorage.setItem("order_Item", food.name);
            localStorage.setItem("item_price", food.price);
            let price = localStorage.getItem("item_price");
            // let cust_id = localStorage.getItem("cust_id");
            console.log(price);
            // window.location.href = "/orderfood";
            navigate('/orderfood', { state: { food } });

        }
    }
    var cust_id = localStorage.getItem("cust_id");
    console.log(cust_id);

    return cust_id === null ? <Login /> : (

        <div className="container mt-5">
            <h1 className='mb-3'>Available BreakFast</h1>
            <div className="col-md-12 row mb-4">                
                {foods.map((food) => (
                    <div class="card" style={{ width: 300 + "px", display: "inline-block"}}>
                        <img class="card-img-top" src={food.imageUrl} alt="Card image" style={{ width: 300 + "px" }} />
                        <div class="card-body">
                            <h4 class="card-title">Price: ${food.price}</h4>
                            <p class="card-text">Name: {food.name}</p>                            
                            <a href="#" class="btn btn-primary" onClick={onOrderClick(food)}>Book</a>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )

}
export default GetFoodList;
import { Login } from "./Login";
import { ResetTvRounded } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

import React, { Component } from "react";

function SecurityAnswer() {
    const [securityAnswer1, setsecurityAnswer1] = useState("");
    const [securityAnswer2, setsecurityAnswer2] = useState("");
    var cust_id = localStorage.getItem("cust_id");


    const validsecurityAnswer1 = (e) => {
        const securityAnswer1 = e.target.value;
        setsecurityAnswer1(securityAnswer1);
        console.log(securityAnswer1);
    }

    const validsecurityAnswer2 = (e) => {
        const securityAnswer2 = e.target.value;
        setsecurityAnswer2(securityAnswer2);
        console.log(securityAnswer2);
    }
    const handleSubmit = event => {
        event.preventDefault();


        axios.post(`https://pcg45meci4.execute-api.us-east-1.amazonaws.com/validateans/${cust_id}`, {
            answer1: securityAnswer1,
            answer2: securityAnswer2
        })
            .then(response => {
                console.log(response.data);
                window.location.href = "/caesarvalidate";

            })
            .catch((error) => {
                console.log(error)
            })


        alert("Success")

    }



    return cust_id === null ? <Login /> : (
        <div>
            <div className="container">

                <div className='row d-flex justify-content-center'>
                    <div className='col-lg-5'>
                        <div className='card'>
                            <h1>Validate your Security Answers</h1>
                            <form onSubmit={handleSubmit}>
                                <h4>
                                    Security Question 1:
                                </h4>
                                <div>
                                    <label className='mt-4'>Your First School </label>
                                    <input required id='securityquestion' type='text' onChange={validsecurityAnswer1} />
                                </div>

                                <br></br>
                                <h4>
                                    Security Question 2:
                                </h4>
                                <div>
                                    <label className='mt-4'>Your first Pet Name: </label>
                                    <input required id='securityquestion' type='text' onChange={validsecurityAnswer2} />
                                </div>
                                <button type='submit'>Sign In</button>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SecurityAnswer;
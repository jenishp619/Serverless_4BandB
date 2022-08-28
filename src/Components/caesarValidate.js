
import { Login } from "./Login";
import { ResetTvRounded } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

import React, { Component } from "react";

function CaesarValidate() {
    const [plainText, setPlainText] = useState([]);
    const [encrypted, setEncrypted] = useState("");

    var cust_id = localStorage.getItem("cust_id");

    useEffect(() => {
        var characters = 'abcdefghijklmnopqrstuvwxyz';
        var result = '';
        var length = 8;
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        console.log(result);
        setPlainText(result);

    }, []);

    const validEncrypted = (e) => {
        const encrypteddata = e.target.value;
        setEncrypted(encrypteddata);
        console.log(encrypted);
    }

    const handleSubmit = event => {
        event.preventDefault();

        let key = "";
        let KeyInt = "";

        axios.get(`https://yc1uf17dt5.execute-api.us-east-1.amazonaws.com/${cust_id}`, {

        })
            .then(response => {
                // console.log(response.data);
                key = response.data;
                KeyInt = parseInt(key);
                let decipher = "";
                var plaintext = plainText;
                plaintext = plaintext.toLowerCase();
                for (let i = 0; i < plaintext.length; i++) {
                    decipher += String.fromCharCode((plaintext.charCodeAt(i) + KeyInt - 97) % 26 + 97);
                }
                console.log("decrypted", decipher);
                console.log(encrypted);

                if (decipher === encrypted) {
                    alert("Success");
                    window.location.href = "/home";

                }
                else{
                    alert("Please Try Again");
                }

            })
            .catch((error) => {
                console.log(error)
            })



    }
    // console.log(decipher);

    return cust_id === null ? <Login /> : (

        <div>
            <div className="container">

                <div className='row d-flex justify-content-center'>
                    <div className='col-lg-5'>
                        <div className='card'>
                            <h1>Validate your Caesar Cipher Key</h1>
                            <form onSubmit={handleSubmit}>
                                <h4>
                                    Please Encrypt Below Text with your provided Key:
                                </h4>
                                <h3>{plainText}</h3>

                                <div>
                                    <label className='mt-4'>Please enter the Encrypted Text:  </label>
                                    <input required id='email' type='text' onChange={validEncrypted} />
                                </div>
                                <button type='submit'>Validate and Sign In</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CaesarValidate;
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Login } from "../Components/Login";

export default function SentimentAnalysis() {
    const [pwd, setPwd] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const cust_id = localStorage.getItem("cust_id");

    let navigate = useNavigate();

    const submitData = () => {
        axios.post("https://us-central1-serverless-ass4.cloudfunctions.net/sentimentAnalysis", {
            text: text
        })
            .then(response => {
                if(parseFloat(response.data) > 0.00)
                {
                    setResult("Positive: The Sentence "+text+"\n has a sentiment score of "+response.data);    
                }else{
                    setResult("Negative: The Sentence "+text+"\n has a sentiment score of "+response.data);    
                }
                // setResult(response.data);
                
                axios.post("https://zcdejcbvbprj7cjwfsp5el5eby0szlvc.lambda-url.us-east-1.on.aws/", {
                    user_id: cust_id,
                    feedback: text,
                    prediction: response.data
                }).then(response => {
                    console.log("Data added in Dynamodb");
                }).catch((error)=>{
                    console.log(error);                    
                });

                console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
                window.alert("Please enter correct credentials!")
            })
    }

    
    console.log(cust_id);
    
    return cust_id === null? <Login/>:(
        <div className="App">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch', p: 1 },
                }}
                Validate
                autoComplete="off"
            >   
                <Typography component="h1" variant="h5">
                    Provide Feedback 
                </Typography>
                <Typography component="h2" variant="h5">
                    {/* Predicted Result: {result} */}
                </Typography>
                {/* <TextField
                    required
                    id="email"
                    label="Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                /> */}
                <TextField
                    required
                    id="text"
                    label="feedback"
                    type="text"
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
                <Button variant="contained"
                    onClick={submitData}
                >Submit</Button>
            </Box>
        </div>
    );
}

import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Login } from "../Components/Login";

export default function TourPackageRecommender() {
    const [pwd, setPwd] = useState("");
    const [email, setEmail] = useState("");
    const [TotalStayDuration, setTotalStayDuration] = useState("");
    const [StaysInWeekendNights, setStaysInWeekendNights] = useState("");
    const [StaysInWeekNights, setStaysInWeekNights] = useState("");
    const [Adults, setAdults] = useState("");
    const [Children, setChildren] = useState("");
    const [Babies, setBabies] = useState("");
    const [TotalPersons, setTotalPersons] = useState("");
    const [IsRepeatedGuest, setIsRepeatedGuest] = useState("");
    const [NoDeposite, setNoDeposite] = useState("");
    const [NonRefundable, setNonRefundable] = useState("");
    const [Refundable, setRefundable] = useState("");
    const [CustomerType, setCustomerType] = useState("");
    const [RequiredCarParkingSpaces, setRequiredCarParkingSpaces] = useState("");
    const [result, setResult] = useState("");
    const [radioChoice, setRadioChoice] = useState("");    
    // const [CustomerType, setCustomerType] = useState("");
    let navigate = useNavigate();

    const submitData = () => {

        if (radioChoice === "NoDeposite") {
            setNoDeposite("1");
            setRefundable("0");
            setNonRefundable("0");
        } else if (radioChoice === "Refundable") {
            setNoDeposite("0");
            setRefundable("1");
            setNonRefundable("0");
        } else {
            setNoDeposite("0");
            setRefundable("0");
            setNonRefundable("1");            
        }
        
        axios.post("https://us-central1-serverless-ass4.cloudfunctions.net/getTourPackage", {
            TotalStayDuration: (parseInt(StaysInWeekNights) + parseInt(StaysInWeekendNights)).toString(),
            StaysInWeekendNights: StaysInWeekendNights,
            StaysInWeekNights: StaysInWeekNights,
            Adults: Adults,
            Children: Children,
            Babies: Babies,
            TotalPersons: (parseInt(Adults) + parseInt(Children) + parseInt(Babies)).toString(),
            IsRepeatedGuest: IsRepeatedGuest,
            NoDeposite: NoDeposite,
            NonRefundable: NonRefundable,
            Refundable: Refundable,
            CustomerType: CustomerType,
            RequiredCarParkingSpaces: RequiredCarParkingSpaces,
        })
            .then(response => {
                setResult(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
                window.alert("Please enter correct credentials!")
            })
    }

    var cust_id = localStorage.getItem("cust_id");
    console.log(cust_id);
    
    return cust_id === null? <Login/>:(
        <div className="Ml">            
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 0, width: '50ch', p: 1 },
                }}
                Validate
                autoComplete="off"
            >
                <Box m = {1} sx={{ flexGrow: 1, margin: "10% 10% 10% 10%" }}>
                    <Grid item xs={4} sm={3} md={2} lg={1}>
                        <Typography component="h1" variant="h5">
                            Tour Package Recommender
                        </Typography>
                        <Typography component="h2" variant="h5">
                            Recommended Tour: 
                            {result}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx ={{ margin: "1% 1% 1% 1%" }}>                                                
                        <TextField
                            required
                            id="StaysInWeekendNights"
                            label="StaysInWeekendNights"
                            type="StaysInWeekendNights"
                            onChange={(e) => {
                                setStaysInWeekendNights(e.target.value);
                            }}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} sx ={{ margin: "1% 1% 1% 1%" }}>                        
                        <TextField
                            required
                            id="StaysInWeekNights"
                            label="StaysInWeekNights"
                            type="StaysInWeekNights"
                            onChange={(e) => {
                                setStaysInWeekNights(e.target.value);
                                setTotalStayDuration(parseInt(StaysInWeekNights) + parseInt(StaysInWeekendNights));
                            }}
                        />     
                        </Grid>                   
                        <Grid item xs={12} sm={6} md={4} lg={3} sx ={{ margin: "1% 1% 1% 1%" }}>                        
                        <TextField
                            required
                            id="Adults"
                            label="Adults"
                            type="Adults"
                            onChange={(e) => {
                                setAdults(e.target.value);
                            }}
                        />
                        </Grid>                   
                        <Grid item xs={12} sm={6} md={4} lg={3} sx ={{ margin: "1% 1% 1% 1%" }}>                        
                        <TextField
                            required
                            id="Children"
                            label="Children"
                            type="Children"
                            onChange={(e) => {
                                setChildren(e.target.value);
                            }}
                        />
                        </Grid>                   
                        <Grid item xs={12} sm={6} md={4} lg={3} sx ={{ margin: "1% 1% 1% 1%" }}>                        
                        <TextField
                            required
                            id="Babies"
                            label="Babies"
                            type="Babies"
                            onChange={(e) => {
                                setBabies(e.target.value);
                                setTotalPersons(parseInt(Adults) + parseInt(Children) + parseInt(Babies));
                            }}
                        />                        
                        </Grid>                   
                        <Grid item xs={12} sm={6} md={4} lg={3} sx ={{ margin: "1% 1% 1% 1%" }}>                        
                        <TextField
                            required
                            id="IsRepeatedGuest"
                            label="IsRepeatedGuest (0/1)"
                            type="IsRepeatedGuest"
                            onChange={(e) => {
                                setIsRepeatedGuest(e.target.value);
                            }}
                        />                        
                        </Grid>                   
                        <Grid item xs={12} sm={6} md={4} lg={3} sx ={{ margin: "1% 1% 1% 1%" }}>                        
                        <TextField
                            required
                            id="RequiredCarParkingSpaces"
                            label="RequiredCarParkingSpaces"
                            type="RequiredCarParkingSpaces"
                            onChange={(e) => {
                                setRequiredCarParkingSpaces(e.target.value);
                            }}
                        />
                        </Grid>                   
                        <Grid item xs={12} sm={6} md={4} lg={3} sx ={{ margin: "1% 1% 1% 1%" }}>                        
                        <Typography component="h4" variant="h5">
                            Customer Type
                        </Typography>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="1"
                            name="radio-buttons-group"
                            onChange={(e) => {
                                setRadioChoice(e.target.value)
                            }}
                        >
                            <center>
                                <FormControlLabel value="1" control={<Radio />} label="Transient" />
                                <FormControlLabel value="2" control={<Radio />} label="Transient-Party" />
                                <FormControlLabel value="3" control={<Radio />} label="Group" />
                                <FormControlLabel value="4" control={<Radio />} label="Contract" />
                            </center>
                        </RadioGroup>
                        </Grid>                   
                        <Grid item xs={12} sm={6} md={4} lg={3} sx ={{ margin: "1% 1% 1% 1%" }}>                        
                        <Typography component="h4" variant="h5">
                            Payment Type
                        </Typography>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Transcient"
                            name="radio-buttons-group"
                            onChange={(e) => {
                                setCustomerType(e.target.value)
                            }}
                        >
                            <center>
                                <FormControlLabel value="NoDeposite" control={<Radio />} label="NoDeposite" />
                                <FormControlLabel value="Refundable" control={<Radio />} label="Refundable" />
                                <FormControlLabel value="NonRefundable" control={<Radio />} label="NonRefundable" />
                            </center>
                        </RadioGroup>                                            
                        </Grid>                   
                        <Grid item xs={12} sm={6} md={4} lg={3} sx ={{ margin: "1% 1% 1% 1%" }}>                        
                        <Button variant="contained"
                            onClick={submitData}
                        >Predict</Button>
                        </Grid>                    
                </Box>
            </Box>
        </div>
    );
}

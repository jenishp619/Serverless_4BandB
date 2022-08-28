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

export default function AddTours() {
    const [TourName, setTourName] = useState("");    
    const [TourDays, setTourDays] = useState("");
    const [TourDescription, setTourDescription] = useState("");
    const [TourItinerary, setTourItinerary] = useState("");
    const [TourPrice, setTourPrice] = useState("");
    const [TourType, setTourType] = useState("");
    const [ImageUrl, setImageUrl] = useState("");
    const [Ratings, setRatings] = useState("");
    
    // const [CustomerType, setCustomerType] = useState("");
    let navigate = useNavigate();

    const submitData = () => {

        axios.post("https://ehy5pulhs5vfucyidzktg27zva0hizlu.lambda-url.us-east-1.on.aws/", {
            price: TourPrice,
            imageUrl: ImageUrl,
            name: TourName,
            days: TourDays,
            itinerary: TourItinerary,
            type: TourType,
            description:TourDescription,
            ratings: Ratings     
        })
            .then(response => {               
                console.log(response.data);
                window.alert("New Tour added successfully!");
            })
            .catch((error) => {
                console.log(error)
                window.alert("Please enter correct credentials!")
            })
    }


    return (
        <div className="Ml">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 0, width: '50ch', p: 1 },
                }}
                Validate
                autoComplete="off"
            >
                <Box m={1} sx={{ flexGrow: 1, margin: "10% 10% 10% 10%" }}>
                    <Grid item xs={4} sm={3} md={2} lg={1}>
                        <Typography component="h1" variant="h5">
                            Add Tours
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="tourname"
                            label="Tour Name"
                            onChange={(e) => {
                                setTourName(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="tourType"
                            label="Tour Type"
                            onChange={(e) => {
                                setTourType(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="price"
                            label="Tour Price"
                            onChange={(e) => {
                                setTourPrice(e.target.value);
                            }}
                        />
                    </Grid>                    
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="tourDescription"
                            label="Tour Description"
                            onChange={(e) => {
                                setTourDescription(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="itinerary"
                            label="Itinerary"
                            onChange={(e) => {
                                setTourItinerary(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="ratings"
                            label="Ratings"
                            onChange={(e) => {
                                setRatings(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="days"
                            label="Days"
                            onChange={(e) => {
                                setTourDays(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="imageUrl"
                            label="Image URL"
                            onChange={(e) => {
                                setImageUrl(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <Button variant="contained"
                            onClick={submitData}
                        >Submit</Button>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}

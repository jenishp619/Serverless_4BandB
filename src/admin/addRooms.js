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

export default function AddRooms() {
    const [roomName, setRoomName] = useState("");    
    const [roomNumber, setRoomNumber] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    // const [CustomerType, setCustomerType] = useState("");
    let navigate = useNavigate();

    const submitData = () => {

        axios.post("https://m3x3agebq7nq3b3chln3kdsnyq0coalo.lambda-url.us-east-1.on.aws/", {
            roomName: roomName,
            room_no: roomNumber,
            roomPrice: roomPrice,
            imageURL: imageUrl            
        })
            .then(response => {               
                console.log(response.data);
                window.alert("New Room added successfully!");
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
                            Add Rooms
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="roomName"
                            label="Room Type"
                            onChange={(e) => {
                                setRoomName(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="roomNo"
                            label="Room Number"
                            onChange={(e) => {
                                setRoomNumber(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="rooomPrice"
                            label="Room Price"
                            onChange={(e) => {
                                setRoomPrice(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: "1% 1% 1% 1%" }}>
                        <TextField
                            required
                            id="imageUrl"
                            label="image URL"
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

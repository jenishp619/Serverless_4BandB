import React, { useEffect, useState } from "react";
import { Login } from "./Login";


function Home(){
    const myStyle={
        
        height:'80vh',
        marginTop:'-50px',
        fontSize:'20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };
    var cust_id = localStorage.getItem("cust_id");
    console.log(cust_id);
    return cust_id === null? <Login/>:(
        <div className="homepage" style={myStyle}>
            
            <h1> Welcome to HomePage </h1>
            <div >
                
                <h2 style={{ margin: "15px" }}> Select your service </h2>
                <a href={'/SearchRoom'}>
                <button className="btn btn-light btn-outline-success" style={{ margin: "15px" }}>Book Rooms</button>
            </a>
            <a href={'/getFood'}>
                <button className="btn btn-light btn-outline-success" style={{ margin: "15px" }}>Order Food</button>
            </a>
            <a href={'/tours'}>
                <button className="btn btn-light btn-outline-success" style={{ margin: "15px" }}>Book a Tour</button>
            </a>
            <a href={'/predict/sentiments'}>
                <button className="btn btn-light btn-outline-success" style={{ margin: "15px" }}>Predict Sentiments</button>
            </a>
            <a href={'/predict/tourPackage'}>
                <button className="btn btn-light btn-outline-success" style={{ margin: "15px" }}>Recommend me the Tour Package</button>
            </a>
            
            <a href={'/notifications'}>
                <button className="btn btn-light btn-outline-success" style={{ margin: "15px" }}>Notifications</button>
            </a>
            <a href={'/visualization'}>
                <button className="btn btn-light btn-outline-success" style={{ margin: "15px" }}>Visualizations</button>
            </a>
            </div>
        </div>
    )
}
export default Home;
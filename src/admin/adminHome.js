import React, { useEffect, useState } from "react";


function AdminHome(){
    const myStyle={
        height:'80vh',
        marginTop:'-50px',
        fontSize:'20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };
    return (
        <div className="homepage" style={myStyle}>
            <h1> Welcome to Admin HomePage </h1>
            <div>
                <h2> Select your service </h2>
                <a href={'/admin/rooms'}>
                <button>See Unavailable Rooms</button>
            </a>
            <a href={'/admin/food/add'}>
                <button>Add new food item</button>
            </a>
            <a href={'/admin/rooms/add'}>
                <button>Add new rooms</button>
            </a>
            <a href={'/admin/tours/add'}>
                <button>Add new tours</button>
            </a>            
            </div>
        </div>
    )
}
export default AdminHome;
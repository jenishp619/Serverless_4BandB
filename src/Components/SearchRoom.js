import { useEffect, useState } from "react";
import axios from "axios";
import { Login } from "./Login";

const SearchRoom = () => {

    const [toDate, settoDate] = useState('')
    const [noBeds, setnoBeds] = useState('')
    const [fromDate, setfromDate] = useState('')
    const [rooms, setRooms] = useState([])

    const url = "https://m3x3agebq7nq3b3chln3kdsnyq0coalo.lambda-url.us-east-1.on.aws/?TableName=rooms";
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = () => {
        axios.get(`${url}`)
            .then((response) => {
                const allData = response.data.Items;
                setRooms(allData);
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

    const onBookClick = (room) => {
        return function () {
            //alert(JSON.stringify(room));
            let roomdata = {
                "cust_id": "100",
                "price": room.roomPrice,
                "room_no": room.room_no,
                "name": room.roomName,
                "id": room.id,
                "imageURL": room.imageURL
            }
            // alert(JSON.stringify(roomdata));
            localStorage.setItem("roomdata", JSON.stringify(roomdata));
            const dataroom = localStorage.getItem("roomdata");
        }
    }

    var cust_id = localStorage.getItem("cust_id");
    console.log(cust_id);

    return cust_id === null ? <Login /> : (
        <div className="container mt-5">
        <h1 className='mb-3'>Available Rooms</h1>
        <div className="col-md-12 row mb-4">
        <div>            
            {rooms.map((room) => room.isAvailable === 0 ? <></> : (
                <div class="card" style={{ width: 300 + "px", display: "inline-block", marginRight: 20 + "px", marginBottom: 20 + "px" }}>
                    <img class="card-img-top" src={room.imageURL} alt="Card image" style={{ width: 300 + "px" }} />
                    <div class="card-body">
                        <h4 class="card-title">${room.roomPrice}</h4>
                        <h4 class="card-title">NO.{room.room_no}</h4>
                        <p class="card-text">{room.roomName}</p>
                        <a href="/addroom" class="btn btn-primary" onClick={onBookClick(room)}>Book</a>
                    </div>
                </div>
            ))}
        </div>
        </div>
        </div>
    )
}

export default SearchRoom
import { useEffect, useState } from "react";
import axios from "axios";

const AllRooms = () => {

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

    const onBookClick = (room) => {
        return function () {
            //alert(JSON.stringify(room));
            let roomdata = { "cust_id": "100", "price": room.roomPrice, "room_no": room.room_no, "name": room.roomName }
            // alert(JSON.stringify(roomdata));
            localStorage.setItem("roomdata", JSON.stringify(roomdata));
            const dataroom = localStorage.getItem("roomdata");
            console.log(room);
            axios.put("https://m3x3agebq7nq3b3chln3kdsnyq0coalo.lambda-url.us-east-1.on.aws/", {
                id: room.id,
                roomName: room.roomName,
                room_no: room.room_no,
                roomPrice: room.roomPrice,
                imageURL: room.imageURL,
                isAvailable: 1
            })
                .then(response => {
                    console.log(response.data);
                    window.alert("Room set to available successfully!");
                })
                .catch((error) => {
                    console.log(error)
                    window.alert("Please enter correct credentials!")
                })
        }
    }

    return (
        <div>
            <h1>Unavailable Rooms</h1>
            <br></br>

            {rooms.map((room) => room.isAvailable === 1 ? <></> : (
                <div class="card" style={{ width: 300 + "px", display: "inline-block", marginRight: 20 + "px", marginBottom: 20 + "px" }}>
                    <img class="card-img-top" src={room.imageURL} alt="Card image" style={{ width: 300 + "px" }} />
                    <div class="card-body">
                        <h4 class="card-title">${room.roomPrice}</h4>
                        <h4 class="card-title">NO.{room.room_no}</h4>
                        <p class="card-text">{room.roomName}</p>
                        {/* <button type="button" class="btn btn-primary" onClick={onBookClick(room)}>Make Available</button> */}
                        <a href="/admin/rooms" class="btn btn-primary" onClick={onBookClick(room)}>Make Available</a>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default AllRooms
import axios from "axios";
import { useState } from "react";
import { Login } from "./Login";


export default function Addroom() {
  var dataroom = localStorage.getItem("roomdata");
  var cust_id = localStorage.getItem("cust_id");
  let d = JSON.parse(dataroom);
  //alert((d.cust_id));
  const initialValues = {
    id: cust_id,
    name: d.name,
    room_no: d.room_no,
    price: d.price,
    start_date: "20/3/2022",
    end_date: "29/3/2022",
    cust_feedback: "",
  };

  const [formValue, setFormValue] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("form values = " + formValue.feedback);
    const form_data = {
      "cust_id": formValue.id,
      "name": formValue.name,
      "room_no": formValue.room_no,
      "start_date": formValue.start_date,
      "end_date": formValue.end_date,
      "price": formValue.price,
      //"feedback": formValue.feedback,
    };
    axios.post("https://us-east1-norse-baton-356415.cloudfunctions.net/roomBookingPublish", form_data
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          
          // console.log(d.id);
          // console.log(d.name);
          // console.log(d.room_no);
          // console.log(d.price);
          // console.log(d.imageURL);
          axios.put("https://m3x3agebq7nq3b3chln3kdsnyq0coalo.lambda-url.us-east-1.on.aws/", {
            id: d.id,
            roomName: d.name,
            room_no: d.room_no,
            roomPrice: d.price,
            imageURL: d.imageURL,
            isAvailable: 0
          })
            .then(response => {
              console.log("Booking Confirmed");
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error)
              window.alert("Please enter correct credentials!")
            })

          // console.log(response.data.status);
          // window.location.href = "/profilelist";
          console.log("Room booked google successfully");
        }
      })
      .catch(function (error) {
        alert("Error submitting feedback");
        console.log("Exception occured");
        console.log(error);
      });
    console.log(form_data);
    localStorage.removeItem("roomdata");
    axios
      .post(
        "https://r3g1kc5x8e.execute-api.us-east-1.amazonaws.com/addroom",
        form_data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // console.log(response.data.status);
          // window.location.href = "/profilelist";
          alert("Room booked successfully");
        }
      })
      .catch(function (error) {
        alert("Error submitting feedback");
        console.log("Exception occured");
        console.log(error);
      });
  };
  var cust_id = localStorage.getItem("cust_id");
  console.log(cust_id);
  
  return cust_id === null? <Login/>:(
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Your ID :
          <input
            type="text"
            name="id"
            value={formValue.id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your room_no :
          <input
            type="text"
            name="room_no"
            value={formValue.room_no}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your price :
          <input
            type="text"
            name="price"
            value={formValue.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your name :
          <input
            type="text"
            name="name"
            value={formValue.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your start_date :
          <input
            type="date"
            name="start_date"
            value={formValue.start_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your end_date :
          <input
            type="date"
            name="end_date"
            value={formValue.end_date}
            onChange={handleChange}
            required
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

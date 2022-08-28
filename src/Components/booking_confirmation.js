import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import * as uuid from "uuid";
import { Login } from "./Login";
// function BookingConfirmation(props) {
// const [item, setItem] = useState({
//   description:
//     "The Halifax Waterfront is a bustling hotspot in the city. With one of the world’s longest urban boardwalks spanning the length of the waterfront for 4 kilometres (2.5 miles), from Pier 21 at the Halifax Seaport to Casino Nova Scotia it is easy to spend a day exploring here.\n\n",
//   image:
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxbDka0-OEaTIK9mFhGLTcvR8wK534vmvABw&usqp=CAU",
//   place: "Surat",
//   price: "1000",
//   rating: "10/10",
// });
function BookingConfirmation(props) {

  const location = useLocation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tourPrice, setTourPrice] = useState(1000);

  const [item, setItem] = useState({
    description: location.state.description,
    image: location.state.imageUrl,
    place: location.state.name,
    price: location.state.price,
    rating: location.state.ratings,
  });
  useEffect(() => {
    setItem(location?.state?.item)
  }, []);

  const confirmBooking = () => {
    if (!startDate || !endDate) {
      return;
    }

    var start = moment(startDate, "YYYY-MM-DD");
    var end = moment(endDate, "YYYY-MM-DD");

    //Difference in number of days
    var days = moment.duration(end.diff(start)).asDays();

    var newPrice = Math.floor((days * tourPrice) / 7);
    setTourPrice(newPrice);
    var cust_id = localStorage.getItem("cust_id");
    var data = {
      Itinerary: item.name,
      cust_id: cust_id,
      price: item.price,
      start_Date: startDate,
      end_Date: endDate,
      rating: item.ratings,
      tour_id: uuid.v4(),
    };
    console.log(data);
    localStorage.removeItem("roomdata");
    axios
      .post(
        "https://ddrxhagqw4.execute-api.us-east-1.amazonaws.com/addtour",
        data
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // console.log(response.data.status);
          axios
            .post(
              "https://us-east1-norse-baton-356415.cloudfunctions.net/tourBookingPublish",
              data
            )
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                // console.log(response.data.status);
                console.log("Booking  successfully and google email");
              }
            })
            .catch(function (error) {
              alert("Error submitting feedback");
              console.log("Exception occured");
              console.log(error);
            });
          // window.location.href = "/profilelist";
          window.location.href = "/home";
          // alert("Booking  successfully");
        }
      })
      .catch(function (error) {
        alert("Error submitting feedback");
        console.log("Exception occured");
        console.log(error);
      });
    // axios.post('',)
  };
  var cust_id = localStorage.getItem("cust_id");
  console.log(cust_id);
  
  return cust_id === null? <Login/>:(
    <div className="container text-center">
      <h1 className="mt-3">Confirm your booking</h1>
      <div className="card mt-4 col-md-8 mx-auto">
        <img className="card-img-top mt-2" src={item.imageUrl} alt={item.name} />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <p className="card-text">Ratings: {item.ratings}/10</p>
          <h5 className="card-title">Price : {item.price}$</h5>

          <strong className="pull-left mt-3">
            <label className="pull-left mt-3">Start date</label>
          </strong>
          <input
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control"
            type="date"
          ></input>

          <strong className="pull-left mt-3">
            <label className="mt-3">End date</label>
          </strong>
          <input
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className="form-control"
            type="date"
          ></input>
          {startDate && endDate && (
            <a onClick={confirmBooking} className="btn btn-primary mt-4">
              Confirm
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;

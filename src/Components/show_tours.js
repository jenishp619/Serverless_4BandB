import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from './Login';


function ShowTours(props) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios.get('https://m3x3agebq7nq3b3chln3kdsnyq0coalo.lambda-url.us-east-1.on.aws/?TableName=tours');
    console.log(response.data.Items);
    setAvailablePlaces(response.data.Items);
  }

  useEffect(() => {
    getData();
  }, [])

  const bookTicket = (item) => {
    navigate('/booking_confirmation', { state: { item } });
  }

  var cust_id = localStorage.getItem("cust_id");
  console.log(cust_id);

  return cust_id === null ? <Login /> : (
    <div className="container mt-5">
      <h1 className='mb-3'>Available tour packages</h1>
      <div className="col-md-12 row mb-4">
        {
          availablePlaces.map((item, index) => {
            return (
              <div className="card col-md-3">
                <img className="card-img-top mt-2" src={item.imageUrl} alt={item.name} />
                <div className="card-body">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-text">{item.itinerary}</p>
                  <h5 className="card-title">{item.type}</h5>
                  <h5 className="card-title">Price : {item.price}$ {item.days}days</h5>
                  <a href="/booking_confirmation" onClick={(e) => bookTicket(item)} className="btn btn-primary">Book this place</a>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default ShowTours;
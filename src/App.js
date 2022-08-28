import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { Confirmation } from './Components/Confirmation';
import { Register } from './Components/Register';
import { Login } from './Components/Login';
import TourPackageRecommender from './MachineLearning/tourPackageRecommender';
import SentimentAnalysis from "./MachineLearning/sentimentAnalysis";
import Home from './Components/HomePage';
import SearchRoom from './Components/SearchRoom';
import GetFoodList from './Components/GetFoodOrder';
import Addroom from './Components/addroom';
import ShowTours from './Components/show_tours';
import SecurityAnswer from './Components/SecurityAnswerConfirm';
import BookingConfirmation from './Components/booking_confirmation';
import OrderFood from './Components/OrderFood';
import AddRooms from './admin/addRooms';
import AllRooms from './admin/allRooms';
import AddFoods from './admin/addFood';
import AddTours from './admin/addTour';
import AdminHome from './admin/adminHome';
import GetNotifications from './Components/GetNotifications';
import VisualizeData from './Components/Visualization';
import { Grid, Box } from "@mui/material";
import CaesarRegister from './Components/casearCipherRegister';
import CaesarValidate from './Components/caesarValidate';
import Logout from './Components/Logout';


function App() {

  return (
    <BrowserRouter>      
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/home">Bread and Breakfast</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link" href="/SearchRoom">Book Rooms</a>
            <a class="nav-item nav-link" href="/tours">Book Tours</a>
            <a class="nav-item nav-link" href="/getFood">Order Food</a>
            <a class="nav-item nav-link" href="/predict/sentiments">Feedback</a>
            <a class="nav-item nav-link" href="/predict/tourPackage">Recommendation</a>
            <a class="nav-item nav-link" href="/notifications">Notifications</a>
            <a class="nav-item nav-link" href="/visualization">Visualizations</a>
            <a class="nav-item nav-link" href="/logout">Logout</a>

          </div>
        </div>
      </nav>
      <Box sx={{ height: "100vh", width: "100vw" }}>
        <Routes>          
          <Route path="/home" element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/confirmation' element={<Confirmation />}></Route>
          <Route path='/' element={<Login />}></Route>
          <Route path='/predict/tourPackage' element={<TourPackageRecommender />} />
          <Route path='/predict/sentiments' element={<SentimentAnalysis />} />
          {/* <Route path='/getFood' element={<SearchRoom />}></Route> */}
          <Route path='/orderfood' element={<OrderFood />}></Route>
          <Route path='/getFood' element={<GetFoodList />}></Route>
          <Route path={'/addroom'} element={<Addroom />} ></Route>
          <Route exact path="/SearchRoom" element={<SearchRoom />} />
          <Route path='/tours' element={<ShowTours />}></Route>
          <Route path='/booking_confirmation' element={<BookingConfirmation />}></Route>
          <Route path='/admin/rooms' element={<AllRooms />} ></Route>
          <Route path='/admin/rooms/add' element={<AddRooms />} ></Route>
          <Route path='/admin/food/add' element={<AddFoods />} ></Route>
          <Route path='/admin/tours/add' element={<AddTours />} ></Route>
          <Route path='/admin/home' element={<AdminHome />} ></Route>
          <Route path='/securitycheck' element={<SecurityAnswer />}></Route>
          <Route path='/notifications' element={<GetNotifications />} ></Route>
          <Route path='/visualization' element={<VisualizeData />} ></Route>
          <Route path = '/caesarregister' element = {<CaesarRegister />}></Route>
          <Route path = '/caesarvalidate' element = {<CaesarValidate />}></Route>
          <Route path = '/logout' element = {<Logout />}></Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;

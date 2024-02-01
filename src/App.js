import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import BookRide from "./components/BookRide";
import ShowRides from "./components/ShowRides";
import OfferRide from "./components/OfferRide";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <br />
          <Header />
        </div>
        <div className="bg-image">
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/BookRide" element={<BookRide />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/ShowRides" element={<ShowRides />}></Route>
            <Route exact path="/OfferRide" element={<OfferRide />}></Route>
            <Route exact path="/Home" element={<Home />}></Route>
            <Route exact path="/Header" element={<Header />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

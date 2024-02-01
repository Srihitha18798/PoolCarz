import { Button } from "@mui/material";
import axios from "axios";
import { UserContext } from "../UserContext";
import React, { useContext, useState } from "react";
import BookRide from "./BookRide";
import { useNavigate } from "react-router-dom";

const JSON_SERVER_URL = "http://localhost:5000/offers";
const JSON_SERVER_URL_Book = "http://localhost:5001/rides";

const ShowRides = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [showRides, setShowRides] = useState(false);
  const [ridesTable, setRidesTable] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(-1);
  const [showRowData, setShowRowData] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [blurShowRides, setBlurShowRides] = useState(false);
  const [bookedId, setBookedId] = useState(null);

  const filterByType = (type) => {
    setFilterType(type);
    setShowRowData(false);
  };

  let filteredRides = ridesTable;

  if (filterType === "fromInfosys") {
    filteredRides = ridesTable.filter((ride) => ride.pickUp === "Infosys");
  } else if (filterType === "toInfosys") {
    filteredRides = ridesTable.filter((ride) => ride.destination === "Infosys");
  } else if (filterType === "others") {
    filteredRides = ridesTable.filter(
      (ride) => ride.pickUp !== "Infosys" && ride.destination !== "Infosys"
    );
  } else if (filterByType === "all") {
    filteredRides = ridesTable;
  }

  const setRides = async (e) => {
    try {
      const response = await axios.get(JSON_SERVER_URL);
      setRidesTable(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const allRidesCLicked = () => {
    setShowRides(!showRides);
    filterByType("all");
    setRides();
  };

  const showData = (index) => {
    setShowRowData(true);
    setSelectedRow(ridesTable[index]);
  };

  const bookRide = async (selectedRow) => {
    setShowRides(false);
    setBlurShowRides(true);
    const data = {
      riderName: user,
      rideeName: selectedRow.name,
      pickUp: selectedRow.pickUp,
      destination: selectedRow.destination,
      status: "Booked",
    };

    try {
      const [response1, response2] = await Promise.all([
        axios.patch(`${JSON_SERVER_URL}/${selectedRow.id}`, {
          seatsLeft: selectedRow.seatsLeft - 1,
        }),
        axios.post(JSON_SERVER_URL_Book, data),
      ]);

      console.log(response2);
      setBookedId(response2.data.id);

      if (response1.status === 200) {
        console.log(response1);

        setSelectedRow(response1.data);
      }
    } catch (error) {
      console.log("Error booking a ride", error);
    }
  };

  // const postBookedRide = async (data) => {
  //   try {

  //     console.log(bookRide);
  //     setBookedId(bookRide.data.id);
  //   } catch (error) {
  //     console.log("Error booking a ride", error);
  //   }
  // };

  return (
    <>
      <div
        style={{
          color: "black",
          display: "flex",
          flexDirection: "column",
          marginTop: "100px",
          backgroundColor: "#f8f9fa",
          borderRaduis: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          width: "80%",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#337ab6",
            color: "white",
            height: "45px",
          }}
        >
          <h2 style={{ fontSize: "1.5em" }}>Book a Ride</h2>
        </div>
        <br />
        <div>
          Pool Carz is an online application which enables users to share rides
          with others. You can either book a ride or offer a ride. Did we
          mention that this app is advertisement free ? To add on top of that
          its free of cost ! So what are you waiting for ? Check out the rides
          available and start PCing!!
        </div>
        <br />
        {showRides ? (
          <>
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => allRidesCLicked()}
              >
                Show All Rides
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => filterByType("fromInfosys")}
              >
                From Infosys
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => filterByType("toInfosys")}
              >
                TO Infosys
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => filterByType("others")}
              >
                Others
              </Button>
            </div>
            <br />
            <br />

            <div>
              <div style={{ color: "blue", fontSize: "1.2em" }}>
                Please select a ride
              </div>
              <br />

              <div>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "1px solid black",
                  }}
                >
                  <thead style={{ backgroundColor: "#337ab6", color: "white" }}>
                    <tr>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "8px",
                        }}
                      >
                        Start Point
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "8px",
                        }}
                      >
                        End Point
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "8px",
                        }}
                      >
                        Seats Available
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRides.map((ride, index) => (
                      <tr
                        key={index}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(-1)}
                        onClick={() => showData(index)}
                        style={{
                          border: "1px solid black",
                          padding: "8px",
                          backgroundColor:
                            hoveredRow === index ? "#337ab6" : "",
                          transition: "background-color 0.3s",
                        }}
                      >
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                          }}
                        >
                          {ride.pickUp}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                          }}
                        >
                          {ride.destination}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                          }}
                        >
                          {ride.seatsLeft}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {showRowData && selectedRow && (
              <BookRide
                selectedRow={selectedRow}
                bookRide={bookRide}
                showCancelButton={false}
                bookedId={bookedId}
              ></BookRide>
            )}
            <br />
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => navigate("/OfferRide")}
              >
                Offer a Ride!
              </Button>
            </div>
            <br />
          </>
        ) : (
          <>
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={blurShowRides}
                onClick={() => allRidesCLicked()}
              >
                Show All Rides
              </Button>
            </div>
            <br />
            {blurShowRides && (
              <BookRide
                selectedRow={selectedRow}
                bookRide={bookRide}
                showCancelButton={true}
                bookedId={bookedId}
              ></BookRide>
            )}
            <br />
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => navigate("/OfferRide")}
              >
                Offer a Ride!
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShowRides;

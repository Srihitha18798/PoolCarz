import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";

const JSON_SERVER_URL = "http://localhost:5000/offers";
const JSON_SERVER_URL_Book = "http://localhost:5001/rides";

const BookRide = ({ selectedRow, bookRide, showCancelButton, bookedId }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [id, setId] = useState(null);

  const cancelRide = async () => {
    try {
      const [response1, response2] = await Promise.all([
        axios.patch(`${JSON_SERVER_URL}/${selectedRow.id}`, {
          seatsLeft: selectedRow.seatsLeft + 1,
        }),
        await axios.delete(`${JSON_SERVER_URL_Book}/${id}`),
      ]);

      if (response2.status === 200 && response1.status === 200) {
        console.log(response1);
        console.log(response2);
        navigate("/Home");
      }
    } catch (error) {
      console.log("Error booking a ride", error);
    }
  };

  const showNotification = (id) => {
    setId(id);
    setSuccess(true);
  };
  const areUSureDelete = (choose) => {
    if (choose) {
      cancelRide();
    } else {
      navigate("/Home");
    }
  };

  return (
    <>
      {success ? (
        <Notification
          message={"Are you sure you need to cancel the booking?"}
          onDialog={areUSureDelete}
        />
      ) : (
        <div
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            backgroundColor: "#f8f9fa",
            borderRaduis: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            width: "100%",
            maxWidth: "550px",
            marginLeft: "auto",
            marginRight: "auto",
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
            <h2 style={{ fontSize: "1.5em" }}>Ride Details</h2>
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
              <thead style={{ color: "black" }}>
                <tr>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Name
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Start Point
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    End Point
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Car
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Seats Available
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {selectedRow.name}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {selectedRow.pickUp}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {selectedRow.destination}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {selectedRow.car}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {selectedRow.seatsLeft}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          {showCancelButton ? (
            <>
              <p>Ride Booked. Id is {bookedId}</p>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => showNotification(bookedId)}
                >
                  Cancel Ride
                </Button>
              </div>
            </>
          ) : (
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => bookRide(selectedRow)}
              >
                Book Ride!
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BookRide;

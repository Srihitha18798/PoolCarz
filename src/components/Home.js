import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          color: "black",
          display: "flex",
          flexDirection: "column",
          marginTop: "100px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
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
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "2.3em", fontWeight: "bold" }}>
            Welcome to the Pool Carz!
          </h1>
          <p>
            Pool Carz is an online application that allows users to share rides.
          </p>
          <p>Find or offer rides with others for your daily commute.</p>
          <Button
           variant="contained"
           color="primary"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginTop: "20px",
            }}
            onClick={() => navigate("/ShowRides")}
          >
            Show Available Rides
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;

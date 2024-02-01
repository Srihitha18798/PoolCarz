import { Button, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const JSON_SERVER_URL = "http://localhost:5000/offers";

const OfferRide = () => {
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.get(JSON_SERVER_URL, data);
      console.log(response);
      console.log("dded Successfully");
      setSuccessMsg("Added Successfully");
      setErrMsg("");
      navigate("/ShowRides");
    } catch (error) {
      console.log("Error:", error);
      setErrMsg("Error during adding a ride");
      setSuccessMsg("");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
          maxWidth: "700px",
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
          <h2 style={{ fontSize: "1.5em" }}>Car Ride Registration Form</h2>
        </div>
        <br />
        <div>
          <InputLabel style={{ color: "black", paddingRight: "650px" }}>
            Name:
          </InputLabel>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                error={!!errors.name}
                helperText={errors.name ? "Name is required" : ""}
                FormHelperTextProps={{
                  style: {
                    color: "red",
                  },
                }}
              ></TextField>
            )}
          ></Controller>
        </div>
        <br />
        <div>
          <InputLabel style={{ color: "black", paddingRight: "590px" }}>
            Start Location:
          </InputLabel>
          <Controller
            name="pickUp"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                error={!!errors.pickUp}
                helperText={errors.pickUp ? "Start Location is required" : ""}
                FormHelperTextProps={{
                  style: {
                    color: "red",
                  },
                }}
              ></TextField>
            )}
          ></Controller>
        </div>
        <br />
        <div>
          <InputLabel style={{ color: "black", paddingRight: "610px" }}>
            Destination:
          </InputLabel>
          <Controller
            name="destination"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                error={!!errors.destination}
                helperText={errors.destination ? "Destination is required" : ""}
                FormHelperTextProps={{
                  style: {
                    color: "red",
                  },
                }}
              ></TextField>
            )}
          ></Controller>
        </div>
        <br />
        <div>
          <InputLabel style={{ color: "black", paddingRight: "660px" }}>
            Car:
          </InputLabel>
          <Controller
            name="car"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                error={!!errors.car}
                helperText={errors.car ? "Car is required" : ""}
                FormHelperTextProps={{
                  style: {
                    color: "red",
                  },
                }}
              ></TextField>
            )}
          ></Controller>
        </div>
        <br />
        <div>
          <InputLabel style={{ color: "black", paddingRight: "620px" }}>
            Seats Left:
          </InputLabel>
          <Controller
            name="seatsLeft"
            type="number"
            control={control}
            defaultValue=""
            rules={{ required: true, min: 0, max: 8 }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                error={!!errors.seatsLeft}
                helperText={
                  errors.seatsLeft
                    ? "Seats should be greater 0 and less than 8"
                    : ""
                }
                FormHelperTextProps={{
                  style: {
                    color: "red",
                  },
                }}
              ></TextField>
            )}
          ></Controller>
        </div>
        <br />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <br />
          {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
          {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
        </div>
      </form>
      <br />
      <br />
      <br />
    </>
  );
};

export default OfferRide;

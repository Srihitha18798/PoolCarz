import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const JSON_SERVER_URL = "http://localhost:5000/users";

const Login = () => {
  const { handleLogin } = useContext(UserContext);

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
      const response = await axios.get(
        `${JSON_SERVER_URL}?userName=${data.userName}`
      );
      console.log(response);
      if (response.data.length === 1) {
        const userData = response.data[0];

        if (userData.password === data.password) {
          console.log(" You are successfully Logged In");
          setSuccessMsg(
            "Login successful! Please wait, Show Rides page is loading..."
          );
          setErrMsg("");
          handleLogin(data.userName);
          navigate("/Home");
        } else {
          console.log("UserName or Password is not matching with our records");
          setErrMsg("UserName or Password is not matching with our records");
          setSuccessMsg("");
        }
      } else {
        console.log("User not found");
        setErrMsg("Details do not exist in our database.");
        setSuccessMsg("");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrMsg("Error during login");
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
          maxWidth: "400px",
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
          <h2 style={{ fontSize: "1.5em" }}>Login</h2>
        </div>
        <br />
        <div>
          <InputLabel style={{ color: "black", paddingRight: "310px" }}>
            User Name:
          </InputLabel>
          <Controller
            name="userName"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                error={!!errors.userName}
                helperText={errors.userName ? "User Name is required" : ""}
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
          <InputLabel style={{ color: "black", paddingRight: "320px" }}>
            Password:
          </InputLabel>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true, minLength: 5, maxLength: 10 }}
            render={({ field }) => (
              <TextField
                fullWidth
                type="password"
                {...field}
                error={!!errors.password}
                helperText={
                  errors.password
                    ? "Password must be 5 to 10 characters long."
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
            Login
          </Button>
          <br />
          {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
          {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
        </div>
      </form>
    </>
  );
};

export default Login;

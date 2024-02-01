import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../components/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const { handleLogout } = useContext(UserContext);

  const LogoutClick = () => {
    handleLogout();
    navigate("/Login");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">PoolCarz</div>
      {user ? (
        <ul className="navbar-links" style={{ color: "white" }}>
          <Link to="/Home">Home</Link>
          <Button
            className="navbar-link button"
            style={{
              color: "white",
              textTransform: "none",
              paddingLeft: "0",
              fontSize: "1em",
              fontStyle: "italic",
            }}
            onClick={() => LogoutClick()}
          >
            Logout
          </Button>
          &nbsp; &nbsp;
        </ul>
      ) : null}
    </div>
  );
};

export default Navbar;

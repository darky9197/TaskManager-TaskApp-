import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const NavContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
  background-color: #e0e0e0;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  text-align: center;

  .nav-links {
    display: flex;
    flex-direction: column;

    a {
      color: #383737;
      font-size: 1rem;
      font-weight: 500;
      padding: 0.5rem;
      margin-bottom: 1rem;

      &:hover {
        background-color: #d6d6d6;
        transition: background-color 300ms;
      }
    }
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <NavContainer>
      <div>
        <Link to="/"style={{ color: 'black', textDecoration: 'none' }}>
          <h3 className="text-center text-3xl font-bold mx-4 mb-8">TaskApp</h3>
        </Link>

        <div className="nav-links">
          <Link to="tasks">Tasks</Link>
          {user.role == "MANAGER" ? <Link to="manage">Manage</Link> : null}
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          color="error"
          sx={{
            width: "100%",
          }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </NavContainer>
  );
}

export default Navbar;

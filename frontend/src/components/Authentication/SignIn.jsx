import { Password } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import api from "../../axios/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SignIn(props) {
  const navigate = useNavigate();
  const { authSwitch, setAuthSwitch } = props;
  const {saveToken} = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8080/login",
      loginData,
    );

    const token = response.data;
    if (token) {
      // localStorage.setItem("token", token);
      saveToken(token);
      navigate("/");
    }
  };
  return (
    <div className="grid gap-4 p-6 bg-white rounded-lg shadow-lg w-96">
      <h1 className="text-3xl font-bold text-center pb-4">Sign In</h1>
      <TextField
        label="Email"
        type="email"
        required
        variant="outlined"
        value={loginData.email}
        onChange={(e) => {
          setLoginData({
            ...loginData,
            email: e.target.value,
          });
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        required
        value={loginData.password}
        onChange={(e) => {
          setLoginData({
            ...loginData,
            password: e.target.value,
          });
        }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        onClick={handleSubmit}
      >
        Sign In
      </Button>
      <p
        className="text-blue-500 font-medium text-center underline cursor-pointer"
        onClick={() => {
          setAuthSwitch(!authSwitch);
        }}
      >
        Don't have a Account? Sign up
      </p>
    </div>
  );
}

export default SignIn;

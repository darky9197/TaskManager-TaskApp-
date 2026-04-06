import React, { useState } from "react";
import styled from "styled-components";
import { getAuth, useAuth } from "../context/AuthContext";

const HomeContainer = styled.div``;

function Home() {
  const {user} = useAuth();


  return (
    <HomeContainer>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-center w-3/5 text-4xl font-bold">
          Hello, {user.name}.<br/> Welcome to the application
        </h1>
      </div>
    </HomeContainer>
  );
}

export default Home;

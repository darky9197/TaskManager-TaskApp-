import styled from "styled-components";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const AppContainer = styled.div`
  background-color: #e0e0e0;
`;

const MainContent = styled.div`
  margin-left: 200px;
`;

const App = () => {
  return (
    <AppContainer>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </AppContainer>
  );
};

export default App;

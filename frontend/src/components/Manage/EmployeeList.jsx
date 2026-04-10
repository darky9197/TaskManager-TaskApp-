import { Link, useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Employeecard from "./EmployeeCard";

const InnerContainer = styled.div`
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 1px 1px 10px 0px #e0e0e0;
  padding: 1rem;

  .title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .icon {
    background-color: #d4d4d4;
    border-radius: 50%;
    padding: 0.5rem;
    font-size: 3rem;
    margin-bottom: 10px;
  }
`;

const EmployeeList = () => {
  const { employees } = useOutletContext();
  const navigate = useNavigate();

  return (
    <InnerContainer>
      <h1 className="title">Employees List</h1>
      <h3 className="my-4 font-medium">Managers</h3>
      <div className="grid grid-cols-3 gap-3.5">
        {employees
          .filter((emp) => emp.roles === "MANAGER")
          .map((emp) => {
            return <Employeecard key={emp.userId} {...emp} />;
          })}
      </div>
      <h3 className="my-4 font-medium">Employees</h3>
      <div className="grid grid-cols-3 gap-3.5">
        {employees
          .filter((emp) => emp.roles === "EMPLOYEE")
          .map((emp) => {
            return <Employeecard key={emp.userId} {...emp} />;
          })}
      </div>
    </InnerContainer>
  );
};

export default EmployeeList;

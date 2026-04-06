import { useEffect, useState } from "react";
import api from "../axios/api";
import { Outlet } from "react-router-dom";
import EmployeeList from "../components/Manage/EmployeeList";
import TaskEditor from "../components/Manage/TaskEditor";

function Manage() {
  const [manageSwitch, setManageSwitch] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetch() {
      const response = await api.get("/api/fetchusers");
      setEmployees(response.data);
    }
    fetch();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4 grid">
      <Outlet context={{employees}}/>
    </div>
  );
}

export default Manage;

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../axios/api";
import { useAuth } from "../context/AuthContext";

const TaskContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 1px 1px 10px 0px #e0e0e0;

  .title {
    font-weight: 700;
    margin-bottom: 1rem;
  }
`;

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const { user } = useAuth();

  async function handleUpdate(row) {
    try {
      const response = await api.put(`/api/updatestatus/${row.taskId}`);
      setTrigger((prev) => prev + 1);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    async function getTask() {
      try {
        const response = await api.get(`/api/fetchtasks/${user.userId}`);
        // console.log(response.data);
        setTasks(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getTask();
  }, [trigger]);

  return (
    <div className="min-h-screen bg-gray-100 grid">
      <TaskContainer>
        <h2 className="title">Tasks Assigned</h2>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Tasks</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Manage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks
                .filter((row) => row.status == "ASSIGNED")
                .map((row, index) => (
                  <TableRow
                    key={row.taskId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.taskDescription}</TableCell>
                    <TableCell>
                      <p className="bg-green-500 p-1.5 rounded text-center">
                        {row.status}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{
                          textTransform: "none",
                        }}
                        onClick={() => handleUpdate(row)}
                      >
                        Mark as Done
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TaskContainer>
      <TaskContainer>
        <h2 className="title">Tasks Completed</h2>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Tasks</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Manage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks
                .filter((row) => row.status == "COMPLETED")
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.taskDescription}</TableCell>
                    <TableCell>
                      <p className="bg-green-500 p-1.5 rounded text-center">
                        {row.status}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{
                          textTransform: "none",
                        }}
                      >
                        Mark as Done
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TaskContainer>
    </div>
  );
}

export default Tasks;

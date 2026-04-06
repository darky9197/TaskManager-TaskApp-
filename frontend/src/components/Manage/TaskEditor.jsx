import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Button,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../axios/api";
import AddForm from "../AddForm";

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
`;

const TaskContainer = styled.div`
  padding: 1rem;
  margin: 0.5rem 0px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #c9c7c7;

  .title {
    font-weight: 700;
    margin-bottom: 1rem;
  }
`;

const TaskEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [trigger, setTrigger] = useState(0);
  const [formOpener, setFormOpener] = useState(false);

  async function handleDelete(row) {
    try {
      const response = await api.delete(`/manager/deletetask/${row.taskId}`);
      console.log(response.data);
      setTrigger((prev) => prev + 1);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const response = await api.get(`/manager/getuser/${id}`);
        setUser(response.data);
        // console.log(response.data);
      } catch (e) {
        console.log(e.message);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getTask() {
      try {
        const response = await api.get(`/api/fetchtasks/${id}`);
        // console.log(response.data);
        setTasks(response.data);
      } catch (e) {
        console.log(e.message);
      }
    }
    getTask();
  }, [trigger]);

  return (
    <InnerContainer>
      {formOpener ? (
        <AddForm
          id={id}
          formOpener={formOpener}
          setFormOpener={setFormOpener}
          setTrigger={setTrigger}
        />
      ) : null}
      <div
        className="flex my-4 hover:cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIosIcon />
        <p className="font-medium">go back</p>
      </div>
      <div>
        <TaskContainer>
          <h2 className="title">Employee Details</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <div className="grid mt-4">
            <Button
              variant="contained"
              onClick={() => {
                setFormOpener(!formOpener);
              }}
            >
              Add a Task
            </Button>
          </div>
        </TaskContainer>

        <div className="min-h-screen grid">
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                            color="error"
                            sx={{
                              textTransform: "none",
                            }}
                            onClick={() => handleDelete(row)}
                          >
                            Delete
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                            color="error"
                            onClick={() => handleDelete(row)}
                            sx={{
                              textTransform: "none",
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TaskContainer>
        </div>
      </div>
    </InnerContainer>
  );
};

export default TaskEditor;

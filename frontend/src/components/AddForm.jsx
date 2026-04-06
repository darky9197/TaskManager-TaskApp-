import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, TextField } from "@mui/material";
import api from "../axios/api";

const FormLayout = styled.div`
  position: fixed;
  background-color: #4b4b4b6a;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  padding: 1rem;
  min-width: 500px;
  border-radius: 10px;
  background-color: #fff;

  .formContent {
    display: grid;
    gap: 10px;
  }
`;

function AddForm({ id, formOpener, setFormOpener, setTrigger }) {
  const [taskData, setTaskData] = useState({
    taskDescription: "",
  });

  async function addTask() {
    try {
      const response = await api.post(`/manager/addtask/${id}`, taskData);
      console.log(response.data);
      setTaskData({
        taskDescription: "",
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <FormLayout>
      <FormContainer>
        <div
          className="flex my-4 hover:cursor-pointer"
          onClick={() => {
            setFormOpener(!formOpener)
            setTrigger(prev => prev+1)
          }}
        >
          <ArrowBackIosIcon />
          <p className="font-medium">go back</p>
        </div>
        <h1 className="text-center text-xl font-bold my-4">Add a Task</h1>
        <div className="grid gap-4">
          <TextField
            label="Enter Task Description"
            type="text"
            value={taskData.taskDescription}
            onChange={(e) => {
              setTaskData({
                ...taskData,
                taskDescription: e.target.value,
              });
            }}
          />
          <Button variant="contained" onClick={addTask}>
            Add
          </Button>
        </div>
      </FormContainer>
    </FormLayout>
  );
}

export default AddForm;

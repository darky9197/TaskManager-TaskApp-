package com.example.backend.controller;

import com.example.backend.model.Task;
import com.example.backend.model.TaskDTO;
import com.example.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class TasksController {
    private final TaskService taskService;

    @Autowired
    public TasksController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping("/fetchtasks/{id}")
    public ResponseEntity<List<TaskDTO>> fetchTasks(@PathVariable("id") String id){
        return new ResponseEntity<>(taskService.fetchTasks(UUID.fromString(id)), HttpStatus.OK);
    }

    @PutMapping("/updatestatus/{taskId}")
    public ResponseEntity<String> updateTaskStatus(@PathVariable("taskId") String taskId){
        return ResponseEntity.ok(taskService.updateTaskStatus(UUID.fromString(taskId)));
    }
}

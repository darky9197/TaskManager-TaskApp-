package com.example.backend.controller;

import com.example.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
    private final TaskService taskService;

    @Autowired
    public EmployeeController(TaskService taskService){
        this.taskService = taskService;
    }
}

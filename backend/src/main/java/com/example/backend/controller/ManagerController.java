package com.example.backend.controller;

import com.example.backend.model.Task;
import com.example.backend.model.UserDTO;
import com.example.backend.service.TaskService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/manager")
public class ManagerController {
    private final TaskService taskService;
    private final UserService userService;

    @Autowired
    public ManagerController(TaskService taskService,
                             UserService userService){
        this.taskService = taskService;
        this.userService = userService;
    }

    @PostMapping("/addtask/{id}")
    public ResponseEntity<String> addTask(@RequestBody Task task, @PathVariable String id){
        return new ResponseEntity<>(taskService.addTask(task, id), HttpStatus.OK);
    }

    @GetMapping("/getuser/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("userId") String userId){
        return ResponseEntity.ok(userService.getUserById(UUID.fromString(userId)));
    }

    @DeleteMapping("/deletetask/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable("taskId") String taskId){
        return ResponseEntity.ok(taskService.deleteTaskById(UUID.fromString(taskId)));
    }
}

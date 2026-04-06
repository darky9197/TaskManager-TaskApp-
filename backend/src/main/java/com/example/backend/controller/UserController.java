package com.example.backend.controller;

import com.example.backend.model.LoginData;
import com.example.backend.model.Users;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/api/fetchusers")
    public ResponseEntity<List<Users>> fetchUser(){
        return new ResponseEntity<>(userService.fetchUsers(), HttpStatus.OK);
    }

    @PostMapping("/registeruser")
    public ResponseEntity<String> registerUser(@RequestBody Users user){
        String jwtToken = userService.registerUser(user);
        if(jwtToken != null){
            return new ResponseEntity<>(jwtToken, HttpStatus.OK);
        }else{
            throw new UsernameNotFoundException("username not found!!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticate(@RequestBody LoginData login){
        return new ResponseEntity<>(userService.authenticate(login), HttpStatus.OK);
    }
}

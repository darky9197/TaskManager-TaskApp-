package com.example.backend.service;

import com.example.backend.model.LoginData;
import com.example.backend.model.UserDTO;
import com.example.backend.model.Users;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository repository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MyUserDetailsService myUserDetailsService;

    @Autowired
    public UserService(UserRepository repository,
                       AuthenticationManager authenticationManager,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       MyUserDetailsService myUserDetailsService){
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.myUserDetailsService = myUserDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Users> fetchUsers() {
        return repository.findAll();
    }


    public String registerUser(Users user) {
        Optional<Users> emailCheck = repository.findByEmail(user.getEmail());
        if(emailCheck.isPresent()){
            return "user already exist";
        }

        String realPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(user);

        try{
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            realPassword
                    )
            );
//            System.out.println("something happened!!");
            if(auth.isAuthenticated()){
                return jwtService.generateToken(
                        myUserDetailsService.loadUserByUsername(user.getEmail())
                );
            }
        } catch (UsernameNotFoundException e){
            return null;
        }

        return null;
//        return "User Registered!!";
    }

    public String authenticate(LoginData login) throws UsernameNotFoundException {
        Authentication auth = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
                  login.email(),
                  login.password()
          )
        );
        if(auth.isAuthenticated()){
                return jwtService.generateToken(
                        myUserDetailsService.loadUserByUsername(login.email())
                );
        }
        throw new UsernameNotFoundException("username not found!!");
    }

    public UserDTO getUserById(UUID userId) {
        Users user = repository.findById(userId)
                .orElseThrow(()-> new UsernameNotFoundException("username not found!!"));

        return new UserDTO(
                user.getEmail(),
                user.getName(),
                user.getRoles()
        );
    }
}

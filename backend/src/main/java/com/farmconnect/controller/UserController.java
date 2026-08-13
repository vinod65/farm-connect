package com.farmconnect.controller;
import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.farmconnect.entity.User;
import com.farmconnect.security.JwtUtil;
import com.farmconnect.security.RoleUtil;
import com.farmconnect.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;

@RestController
public class UserController {
	
	@Autowired
	private UserService userservice;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers(
	        HttpServletRequest request) {

	    if(!RoleUtil.isAdmin(request)) {

	        return ResponseEntity
	                .status(403)
	                .body("Access Denied");
	    }

	    return ResponseEntity.ok(
	            userservice.getAllUsers()
	    );
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> saveUser( @Valid
	        @RequestBody User user) {

	    try {

	        User savedUser =
	            userservice.saveUser(user);

	        return ResponseEntity.ok(savedUser);

	    } catch (RuntimeException e) {

	        return ResponseEntity
	                .badRequest()
	                .body(e.getMessage());
	    }
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(
	        @RequestBody User user) {

	    User loggedInUser =
	        userservice.loginUser(
	            user.getEmail(),
	            user.getPassword()
	        );

	    if(loggedInUser != null) {

	    	String token =
	    		    jwtUtil.generateToken(
	    		        loggedInUser.getEmail(),
	    		        loggedInUser.getRole()
	    		    );

	    	return ResponseEntity.ok(
	    		    java.util.Map.of(
	    		        "token", token,
	    		        "role", loggedInUser.getRole(),
	    		        "name", loggedInUser.getName(),
	    		        "email", loggedInUser.getEmail()
	    		    )
	    		);
	    }

	    return ResponseEntity
	            .badRequest()
	            .body(
	              "Invalid Credentials"
	            );
	}
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		userservice.deleteUser(id);
		return ResponseEntity.ok("User Deleted Successfully");
	}
	
	
	
	
	
	

}

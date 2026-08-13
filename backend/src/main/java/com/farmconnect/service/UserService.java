package com.farmconnect.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.farmconnect.entity.User;
import com.farmconnect.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public List<User> getAllUsers() {
		return userRepository.findAll();
		
	}
	
	public User saveUser(User user) {
		
		if(user.getEmail().equals(
			    "admin@farmconnect.com"
			)) {

			   throw new RuntimeException(
			      "Reserved email"
			   );
			}

	    if(userRepository.existsByEmail(user.getEmail())){
	        throw new RuntimeException(
	            "Email already exists"
	        );
	    }

	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    return userRepository.save(user);
	}
	
	public User loginUser(String email, String password) {
		
		if("admin@farmconnect.com".equals(email)
			    && password.equals("admin123")) {

			    User admin = new User();

			    admin.setName("Admin");
			    admin.setEmail(email);
			    admin.setRole("Admin");

			    return admin;
			}
		
		User user = userRepository.findByEmail(email);
		
		if(user != null && passwordEncoder.matches(password,user.getPassword())){
			return user;
		}
		return null;
	}
	
	
	public void deleteUser(Long id) {

	    User user = userRepository.findById(id)
	            .orElseThrow(() ->
	                new RuntimeException(
	                    "User not found"
	                ));

	   // if(user.getRole().equals("Admin")) {
	    	
	    if("Admin".equals(user.getRole())) {
	        throw new RuntimeException(
	            "Admin cannot be deleted"
	        );
	    }

	    userRepository.deleteById(id);
	}
	
	
	
}

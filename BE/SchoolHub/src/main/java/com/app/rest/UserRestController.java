package com.app.rest;

import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.dto.UserDTO;
import com.app.entity.User;
import com.app.service.UserService;
import com.app.utility.CustomException;

@CrossOrigin
@RestController
@RequestMapping("/user-api")
public class UserRestController {
	
	@Autowired
	private UserService userService;
	
	//For User Login
	@PostMapping("/user/login")
	public ResponseEntity<User> getUser(@Valid @RequestBody UserDTO userdto) throws CustomException {
		User user=userService.logIn(userdto);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	
	@GetMapping("/user/{id}")
	public ResponseEntity<Optional<User>> getuser(@PathVariable("id") int id) {
		Optional<User> user=userService.findById(id);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	//For User Registration
	@PostMapping("/register")
	public ResponseEntity<User> adduser(@Valid @RequestBody UserDTO userdto) throws CustomException {
		User user=this.userService.addUser(userdto);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
}

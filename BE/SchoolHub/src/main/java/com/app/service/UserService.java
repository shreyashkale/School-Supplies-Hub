package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.UserRepository;
import com.app.dto.UserDTO;
import com.app.entity.User;
import com.app.utility.CustomException;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	//For User Registration
	public User addUser(UserDTO userdto) throws CustomException{
		User user=new User();
		if(!userRepository.findByEmail(userdto.getEmail()).isEmpty()) { 
			throw new CustomException("User.Email.AlreadyPresent");
		}
		user.setUserName(userdto.getUserName());
		user.setEmail(userdto.getEmail());
		user.setMobileno(userdto.getMobileno());
		user.setPassword(userdto.getPassword());
		return userRepository.save(user);
	}
	
	//For User Login
	public User logIn(UserDTO userdto) throws CustomException {
		List<User> user=userRepository.getUser(userdto.getEmail(), userdto.getPassword());
		if(user.isEmpty()){
			throw new CustomException("User.Login.Invalid.Credentials");
		}
		return user.get(0);
		
	}
	
	public Optional<User> findById(int id) {
		Optional<User> user=userRepository.findById(id);
		return user;
	}
}

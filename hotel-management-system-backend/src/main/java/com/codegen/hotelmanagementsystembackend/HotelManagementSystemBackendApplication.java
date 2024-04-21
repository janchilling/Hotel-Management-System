package com.codegen.hotelmanagementsystembackend;

import com.codegen.hotelmanagementsystembackend.entities.Role;
import com.codegen.hotelmanagementsystembackend.entities.User;
import com.codegen.hotelmanagementsystembackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@RequiredArgsConstructor
public class HotelManagementSystemBackendApplication implements CommandLineRunner {

	private final UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(HotelManagementSystemBackendApplication.class, args);
	}

	public void run(String... args){
		User adminAccount = userRepository.findByRole(Role.SYSTEM_ADMIN);
		if(adminAccount == null){
			User user = new User();

			user.setEmail("admin@gmail.com");
			user.setRole(Role.SYSTEM_ADMIN);
			user.setPassword(new BCryptPasswordEncoder().encode("admin"));
			userRepository.save(user);
		}
	}

}

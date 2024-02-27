package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    UserDetailsService userDetailsService();

    User getUserById(Long id);

}

package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.entities.Role;
import org.springframework.security.core.userdetails.UserDetails;

public interface CustomUserDetails extends UserDetails {

    Long getUserId();
    Role getRole();
}

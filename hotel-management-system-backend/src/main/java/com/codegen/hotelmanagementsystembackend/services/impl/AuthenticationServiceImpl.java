package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.JwtAuthenticationResponse;
import com.codegen.hotelmanagementsystembackend.dto.LoginRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.RefreshTokenRequest;
import com.codegen.hotelmanagementsystembackend.dto.SignUpRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Customer;
import com.codegen.hotelmanagementsystembackend.entities.Role;
import com.codegen.hotelmanagementsystembackend.entities.User;
import com.codegen.hotelmanagementsystembackend.repository.CustomerRepository;
import com.codegen.hotelmanagementsystembackend.repository.UserRepository;
import com.codegen.hotelmanagementsystembackend.services.AuthenticationService;
import com.codegen.hotelmanagementsystembackend.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

    private final CustomerRepository customerRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JWTService jwtService;

    public User signup(SignUpRequestDTO signUpRequestDTO){
        User user = new User();

        user.setEmail(signUpRequestDTO.getEmail());
        user.setRole(Role.CUSTOMER);
        user.setPassword(passwordEncoder.encode(signUpRequestDTO.getPassword()));

        user = userRepository.save(user);

        Customer customer = new Customer();

        customer.setUser(user);
        customer.setCustomer_fname(signUpRequestDTO.getFirstName());
        customer.setCustomer_lname(signUpRequestDTO.getLastName());
        customer.setCustomer_street_address(signUpRequestDTO.getStreetAddress());
        customer.setCustomer_city(signUpRequestDTO.getCity());
        customer.setCustomer_state(signUpRequestDTO.getState());
        customer.setCustomer_postal_code(signUpRequestDTO.getPostal_code());
        customer.setCustomer_country(signUpRequestDTO.getCountry());

        customerRepository.save(customer);

        return user;
    }

    public JwtAuthenticationResponse login(LoginRequestDTO loginRequestDTO){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword()));

            var user = userRepository.findByEmail(loginRequestDTO.getEmail()).orElseThrow(() -> new IllegalArgumentException("Email or Password is invalid."));
            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshToken);
            jwtAuthenticationResponse.setUserId(String.valueOf(user.getUser_id()));
            return jwtAuthenticationResponse;
        }catch (AuthenticationException e){
            throw new IllegalArgumentException("Invalid email or password.");
        }
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String userEmail = jwtService.extractUsernames(refreshTokenRequest.getToken());

        User user = userRepository.findByEmail(userEmail).orElseThrow();

        if(jwtService.isTokenValid(refreshTokenRequest.getToken(), user)){
            var jwt = jwtService.generateToken(user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;
        }
        return null;
    }
}

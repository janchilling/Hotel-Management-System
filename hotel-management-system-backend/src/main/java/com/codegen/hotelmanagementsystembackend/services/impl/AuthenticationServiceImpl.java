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
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    public StandardResponse<User> signup(SignUpRequestDTO signUpRequestDTO){
        try {
            if (userRepository.existsByEmail(signUpRequestDTO.getEmail())) {
                return new StandardResponse<>(HttpStatus.BAD_REQUEST.value(), "User with this email already exists", null);
            }

            User user = new User();

            user.setEmail(signUpRequestDTO.getEmail());
            user.setRole(Role.CUSTOMER);
            user.setPassword(passwordEncoder.encode(signUpRequestDTO.getPassword()));

            user = userRepository.save(user);

            Customer customer = new Customer();

            customer.setUser(user);
            customer.setCustomerFname(signUpRequestDTO.getFirstName());
            customer.setCustomerLname(signUpRequestDTO.getLastName());
            customer.setCustomerStreetAddress(signUpRequestDTO.getStreetAddress());
            customer.setCustomerCity(signUpRequestDTO.getCity());
            customer.setCustomerState(signUpRequestDTO.getState());
            customer.setCustomerPostalCode(signUpRequestDTO.getPostalCode());
            customer.setCustomerCountry(signUpRequestDTO.getCountry());

            customerRepository.save(customer);

            return new StandardResponse<>(HttpStatus.OK.value(), "User signed up successfully", user);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
        }
    }

    public StandardResponse<JwtAuthenticationResponse> login(LoginRequestDTO loginRequestDTO){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword()));

            var user = userRepository.findByEmail(loginRequestDTO.getEmail()).orElseThrow(() -> new IllegalArgumentException("Email or Password is invalid."));
            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshToken);
            jwtAuthenticationResponse.setUserId(String.valueOf(user.getUserId()));

            return new StandardResponse<>(HttpStatus.OK.value(), "Login successful", jwtAuthenticationResponse);
        } catch (AuthenticationException e) {
            return new StandardResponse<>(HttpStatus.UNAUTHORIZED.value(), "Invalid email or password", null);
        }
    }

    public StandardResponse<JwtAuthenticationResponse> refreshToken(RefreshTokenRequest refreshTokenRequest){
        try {
            String userEmail = jwtService.extractUsernames(refreshTokenRequest.getToken());

            User user = userRepository.findByEmail(userEmail).orElse(null);

            if(user != null && jwtService.isTokenValid(refreshTokenRequest.getToken(), user)){
                var jwt = jwtService.generateToken(user);

                JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

                jwtAuthenticationResponse.setToken(jwt);
                jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());

                return new StandardResponse<>(HttpStatus.OK.value(), "Token refreshed successfully", jwtAuthenticationResponse);
            }
            return new StandardResponse<>(HttpStatus.UNAUTHORIZED.value(), "Unauthorized", null);
        } catch (Exception e) {
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
        }
    }
}

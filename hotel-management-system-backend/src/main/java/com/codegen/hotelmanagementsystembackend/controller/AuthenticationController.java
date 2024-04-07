package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.JwtAuthenticationResponse;
import com.codegen.hotelmanagementsystembackend.dto.LoginRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.RefreshTokenRequest;
import com.codegen.hotelmanagementsystembackend.dto.SignUpRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.User;
import com.codegen.hotelmanagementsystembackend.services.AuthenticationService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public StandardResponse<User> signup(@RequestBody SignUpRequestDTO signUpRequestDTO){
        return authenticationService.signup(signUpRequestDTO);
    }

    @PostMapping("/login")
    public StandardResponse<JwtAuthenticationResponse>  login(@RequestBody LoginRequestDTO loginRequestDTO){
        return authenticationService.login(loginRequestDTO);
    }

    @PostMapping("/refresh")
    public StandardResponse<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return authenticationService.refreshToken(refreshTokenRequest);
    }
}

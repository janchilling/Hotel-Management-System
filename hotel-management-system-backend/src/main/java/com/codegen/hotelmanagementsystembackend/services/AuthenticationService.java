package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.JwtAuthenticationResponse;
import com.codegen.hotelmanagementsystembackend.dto.LoginRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.RefreshTokenRequest;
import com.codegen.hotelmanagementsystembackend.dto.SignUpRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.User;

public interface AuthenticationService {

    User signup(SignUpRequestDTO signUpRequestDTO);

    JwtAuthenticationResponse login(LoginRequestDTO loginRequestDTO);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

}

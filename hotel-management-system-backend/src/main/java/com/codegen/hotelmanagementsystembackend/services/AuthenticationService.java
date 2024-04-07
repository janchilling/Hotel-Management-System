package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.JwtAuthenticationResponse;
import com.codegen.hotelmanagementsystembackend.dto.LoginRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.RefreshTokenRequest;
import com.codegen.hotelmanagementsystembackend.dto.SignUpRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.User;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

public interface AuthenticationService {

    StandardResponse<User> signup(SignUpRequestDTO signUpRequestDTO);

    StandardResponse<JwtAuthenticationResponse>  login(LoginRequestDTO loginRequestDTO);

    StandardResponse<JwtAuthenticationResponse> refreshToken(RefreshTokenRequest refreshTokenRequest);

}

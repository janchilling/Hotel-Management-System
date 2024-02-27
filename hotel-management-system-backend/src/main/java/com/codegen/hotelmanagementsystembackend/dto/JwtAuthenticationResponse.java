package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {

    private String token;

    private String refreshToken;

    private String userId;
}

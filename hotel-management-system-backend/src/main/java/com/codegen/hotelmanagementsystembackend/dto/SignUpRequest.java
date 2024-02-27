package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

@Data
public class SignUpRequest {

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String street_address;
    private String city;
    private String state;
    private String postal_code;
    private String country;


}

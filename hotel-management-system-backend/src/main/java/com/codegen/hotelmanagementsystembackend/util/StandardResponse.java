package com.codegen.hotelmanagementsystembackend.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StandardResponse<T> {
    private int statusCode;
    private String message;
    private T data;
}

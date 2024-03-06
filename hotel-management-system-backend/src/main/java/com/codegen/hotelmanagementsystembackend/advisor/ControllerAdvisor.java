package com.codegen.hotelmanagementsystembackend.advisor;

import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ControllerAdvisor {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<StandardResponse<String>> handleConstraintViolationException(ResourceNotFoundException e) {
        return new ResponseEntity<>(
                new StandardResponse<>(
                        404, e.getMessage(), null
                ),
                HttpStatus.NOT_FOUND);
    }
}

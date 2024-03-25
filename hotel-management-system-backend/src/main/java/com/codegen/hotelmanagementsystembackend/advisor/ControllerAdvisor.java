package com.codegen.hotelmanagementsystembackend.advisor;

import com.codegen.hotelmanagementsystembackend.exception.ResourceAlreadyExistsException;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ControllerAdvisor {

    private static final Logger logger = LoggerFactory.getLogger(ControllerAdvisor.class);

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<StandardResponse<String>> handleConstraintViolationException(ResourceNotFoundException e) {
        logger.error("Resource not found: {}", e.getMessage());
        return new ResponseEntity<>(
                new StandardResponse<>(
                        404, e.getMessage(), null
                ),
                HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public StandardResponse<String> handleResourceAlreadyExistsException(ResourceAlreadyExistsException e) {
        logger.error("Resource already exists: {}", e.getMessage());
                return new StandardResponse<>(
                        HttpStatus.CONFLICT.value(), e.getMessage(), null
                );
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardResponse<String>> handleInternalServerError(Exception e) {
        logger.error("Internal Server Error: {}", e.getMessage());
        return new ResponseEntity<>(
                new StandardResponse<>(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null
                ),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

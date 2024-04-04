package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SupplementRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.SupplementResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Supplement;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.services.SupplementService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/supplements")
@RequiredArgsConstructor
public class SupplementController {

    private final SupplementService supplementService;

    @PostMapping("/")
    public ResponseEntity<List<Supplement>> createSupplement(@RequestBody List<SupplementRequestDTO> supplementRequestDTO){
        return ResponseEntity.ok(supplementService.createSupplement(supplementRequestDTO));
    }

    @GetMapping("/getSupplementById/{supplementId}")
    public StandardResponse<SupplementResponseDTO> getSupplementById(@PathVariable Integer supplementId){
        return supplementService.getSupplementById(supplementId);
    }

}

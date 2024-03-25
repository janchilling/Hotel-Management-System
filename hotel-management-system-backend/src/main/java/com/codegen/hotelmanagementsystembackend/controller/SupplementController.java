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

    @PostMapping("/addSupplements")
    public ResponseEntity<List<Supplement>> createSupplement(@RequestBody List<SupplementRequestDTO> supplementRequestDTO){
        return ResponseEntity.ok(supplementService.createSupplement(supplementRequestDTO));
    }

    @GetMapping("/getSupplementById/{supplementId}")
    public ResponseEntity<SupplementResponseDTO> getSupplementById(@PathVariable Integer supplementId){
        return ResponseEntity.ok(supplementService.getSupplementById(supplementId));
    }

    @GetMapping("/getSupplementByContract/{contractId}")
    public ResponseEntity<StandardResponse<List<SupplementResponseDTO>>> getSupplementByContract(@PathVariable Integer contractId) {
        try {
            List<SupplementResponseDTO> supplementResponseDTOList = supplementService.getSupplementByContract(contractId);
            return ResponseEntity.ok(new StandardResponse<>(200, "Success", supplementResponseDTOList));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new StandardResponse<>(404, ex.getMessage(), null));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new StandardResponse<>(500, "Internal Server Error", null));
        }
    }

    @GetMapping("/getSupplementByHotel/{hotelId}")
    public ResponseEntity<List<List<SupplementResponseDTO>>> getSupplementByHotel(@PathVariable Integer hotelId) {
        return ResponseEntity.ok(supplementService.getSupplementByHotel(hotelId));
    }

}

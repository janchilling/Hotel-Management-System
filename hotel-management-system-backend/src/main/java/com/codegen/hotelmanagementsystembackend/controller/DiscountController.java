package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.DiscountRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Discount;
import com.codegen.hotelmanagementsystembackend.services.DiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/discounts")
@RequiredArgsConstructor
public class DiscountController {

    private final DiscountService discountService;

    @PostMapping("/")
    public ResponseEntity<List<Discount>> createDiscount(@RequestBody List<DiscountRequestDTO> discountRequestDTOS){
        return ResponseEntity.ok(discountService.createDiscount(discountRequestDTOS));
    }

    @GetMapping("/getDiscountById/{discountId}")
    public ResponseEntity<DiscountResponseDTO> getDiscountById(@PathVariable Integer discountId){
        return ResponseEntity.ok(discountService.getDiscountById(discountId));
    }

    @GetMapping("/getDiscountByContract/{contractId}")
    public ResponseEntity<List<DiscountResponseDTO>> getDiscountByContract(@PathVariable Integer contractId){
        return ResponseEntity.ok(discountService.getDiscountByContract(contractId));
    }

    @GetMapping("/getDiscountByHotel/{hotelId}")
    public ResponseEntity<List<List<DiscountResponseDTO>>> getDiscountByHotel(@PathVariable Integer hotelId){
        return ResponseEntity.ok(discountService.getDiscountByHotel(hotelId));
    }
}

package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.DiscountRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Discount;
import com.codegen.hotelmanagementsystembackend.services.DiscountService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
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

    @GetMapping("/{discountId}")
    public StandardResponse<DiscountResponseDTO> getDiscountById(@PathVariable Integer discountId){
        return discountService.getDiscountById(discountId);
    }
}

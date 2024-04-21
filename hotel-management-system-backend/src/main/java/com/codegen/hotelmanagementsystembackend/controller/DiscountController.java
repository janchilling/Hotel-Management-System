package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.DiscountRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Discount;
import com.codegen.hotelmanagementsystembackend.services.DiscountService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/discounts")
@RequiredArgsConstructor
public class DiscountController {

    private final DiscountService discountService;

    @PostMapping("")
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public StandardResponse<List<Discount>> createDiscount(@RequestBody List<DiscountRequestDTO> discountRequestDTOS){
        return discountService.createDiscount(discountRequestDTOS);
    }

    @GetMapping("/{discountId}")
    public StandardResponse<DiscountResponseDTO> getDiscountById(@PathVariable Integer discountId){
        return discountService.getDiscountById(discountId);
    }

    @PutMapping("/batch")
    public StandardResponse<List<DiscountResponseDTO>> updateDiscounts(@RequestBody List<DiscountRequestDTO> discountRequestDTOS){
        return discountService.updateDiscounts(discountRequestDTOS);
    }

    @DeleteMapping("/{discountId}")
    public StandardResponse<Void> deleteDiscountById(@PathVariable Integer discountId){
        return discountService.deleteDiscountById(discountId);
    }

    @DeleteMapping("/batch")
    public StandardResponse<Void> deleteDiscountsByIds(@RequestBody List<Integer> discountIds){
        return discountService.deleteDiscountsByIds(discountIds);
    }
}

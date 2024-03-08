package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.DiscountRequestDTO;

import java.util.List;

public interface DiscountService {

    String createDiscount(List<DiscountRequestDTO> discountRequestDTOS);
}

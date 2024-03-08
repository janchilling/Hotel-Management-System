package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.DiscountRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Discount;

import java.util.List;

public interface DiscountService {

    List<Discount> createDiscount(List<DiscountRequestDTO> discountRequestDTOS);
}

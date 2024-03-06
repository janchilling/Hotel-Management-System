package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.DiscountDTO;
import com.codegen.hotelmanagementsystembackend.dto.MarkupDTO;

import java.util.List;

public interface DiscountService {

    String createDiscount(List<DiscountDTO> discountDTOs);
}

package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.DiscountRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Discount;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

import java.util.List;

public interface DiscountService {

    /**
     * Creates a list of discounts based on the given list of discount request DTOs.
     *
     * @param  discountRequestDTOS   the list of discount request DTOs
     * @return                      a list of discounts
     */
    List<Discount> createDiscount(List<DiscountRequestDTO> discountRequestDTOS);

    /**
     * Get discount by ID.
     *
     * @param  discountId   The ID of the discount to retrieve
     * @return              The DiscountResponseDTO object for the specified ID
     */
    StandardResponse<DiscountResponseDTO> getDiscountById(Integer discountId);

    /**
     * A description of the getDiscountByContract Java function.
     *
     * @param  contractId   description of parameter
     * @return              description of return value
     */
    StandardResponse<List<DiscountResponseDTO>> getDiscountByContract(Integer contractId);

}

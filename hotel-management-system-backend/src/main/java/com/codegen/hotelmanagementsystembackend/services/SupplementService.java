package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SupplementRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.SupplementResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Supplement;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

import java.util.List;

public interface SupplementService {

    StandardResponse<List<Supplement>> createSupplement(List<SupplementRequestDTO> supplementRequestDTO);

    StandardResponse<SupplementResponseDTO> getSupplementById(Integer supplementId);

    StandardResponse<List<SupplementResponseDTO>> getSupplementByContract(Integer contractId);

    StandardResponse<List<SupplementResponseDTO>> updateSupplements(List<SupplementRequestDTO> supplementRequestDTOs);

    StandardResponse<Void> deleteSupplementById(Integer supplementId);

    StandardResponse<Void> deleteSupplementsByIds(List<Integer> supplementIds);
}

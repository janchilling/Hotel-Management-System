package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.DiscountResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SupplementRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.SupplementResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Supplement;

import java.util.List;

public interface SupplementService {

    List<Supplement> createSupplement(List<SupplementRequestDTO> supplementRequestDTO);

    SupplementResponseDTO getSupplementById(Integer supplementId);

    List<SupplementResponseDTO> getSupplementByContract(Integer contractId);

    List<List<SupplementResponseDTO>> getSupplementByHotel(Integer hotelId);

}

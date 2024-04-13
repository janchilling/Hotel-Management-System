package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.ContractRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.ContractResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

import java.util.List;

public interface ContractService {

    StandardResponse<Contract> createContract(ContractRequestDTO contractRequestDTO);

    StandardResponse<List<ContractResponseDTO>> getContractsByHotelId(Integer hotelId);

    StandardResponse<ContractResponseDTO> getContractById(Integer contractId);

    StandardResponse<Contract> updateContract(Integer contractId, ContractRequestDTO contractRequestDTO);
}

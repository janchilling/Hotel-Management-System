package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.ContractRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.ContractResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

public interface ContractService {

    StandardResponse<Contract> createContract(ContractRequestDTO contractRequestDTO);

    ContractResponseDTO getContractById(Integer contractId);

}

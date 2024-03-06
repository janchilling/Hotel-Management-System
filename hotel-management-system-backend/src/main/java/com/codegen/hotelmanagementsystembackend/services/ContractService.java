package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.AddContractDetailsRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.ContractDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;

public interface ContractService {

    Contract createContract(ContractDTO contractDTO);

    String addContractDetails(AddContractDetailsRequestDTO addContractDetailsRequestDTO);

}

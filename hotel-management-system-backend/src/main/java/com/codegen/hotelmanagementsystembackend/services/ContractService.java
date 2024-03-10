package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.ContractRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;

public interface ContractService {

    Contract createContract(ContractRequestDTO contractRequestDTO);

}

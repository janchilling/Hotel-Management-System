package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.ContractDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;

public interface ContractService {

    Contract addBooking(ContractDTO contractDTO);


}

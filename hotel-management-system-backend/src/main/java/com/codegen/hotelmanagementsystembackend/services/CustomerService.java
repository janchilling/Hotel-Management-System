package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.CustomerResponseDTO;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import org.springframework.web.bind.annotation.PathVariable;

public interface CustomerService {

    StandardResponse<CustomerResponseDTO> getCustomerById(Long userId);
}

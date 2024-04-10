package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.CustomerResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Customer;
import com.codegen.hotelmanagementsystembackend.services.CustomerService;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final UtilityMethods utilityMethods;
    private final ModelMapper modelMapper;
    @Override
    public StandardResponse<CustomerResponseDTO> getCustomerById(Long userId) {
        try{
            Customer customer = utilityMethods.getCustomer(userId);
            if(customer == null){
                return new StandardResponse<>(HttpStatus.NOT_FOUND.value(), "Customer not found", null);
            }
            return new StandardResponse<>(HttpStatus.OK.value(), "Success", modelMapper.map(customer, CustomerResponseDTO.class));
        }catch (Exception e){
            return new StandardResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
        }
    }
}

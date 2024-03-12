package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.PaymentResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Customer;
import com.codegen.hotelmanagementsystembackend.entities.Payment;
import com.codegen.hotelmanagementsystembackend.services.PaymentService;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final UtilityMethods utilityMethods;
    private final ModelMapper modelMapper;
    @Override
    public PaymentResponseDTO getPaymentById(Integer paymentId) {
        try{
            Payment payment = utilityMethods.getPayment(paymentId);

            PaymentResponseDTO paymentResponseDTO = modelMapper.map(payment, PaymentResponseDTO.class);
            paymentResponseDTO.setCustomerId(payment.getCustomer().getUser_id());

            return paymentResponseDTO;

        }catch (Exception e){
            throw new ServiceException("Getting Payment failed");
        }
    }
}

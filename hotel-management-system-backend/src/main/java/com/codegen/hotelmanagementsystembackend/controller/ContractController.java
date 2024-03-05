package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.AddContractDetailsRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.ContractDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.services.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    @PostMapping("/addContract")
    public ResponseEntity<Contract> createContract(@RequestBody ContractDTO contractDTO){
        return ResponseEntity.ok(contractService.createContract(contractDTO));
    }

    @PostMapping("/addContractDetails")
    public ResponseEntity<String> createContract(@RequestBody AddContractDetailsRequestDTO addContractDetailsRequestDTO){
        return ResponseEntity.ok(contractService.addContractDetails(addContractDetailsRequestDTO));
    }
}

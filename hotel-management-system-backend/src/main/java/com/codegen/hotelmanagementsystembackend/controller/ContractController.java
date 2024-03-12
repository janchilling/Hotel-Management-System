package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.ContractRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.ContractResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.services.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    @PostMapping("/addContract")
    public ResponseEntity<Contract> createContract(@RequestBody ContractRequestDTO contractRequestDTO){
        return ResponseEntity.ok(contractService.createContract(contractRequestDTO));
    }

    @GetMapping("/getContractById/{contractId}")
    public ResponseEntity<ContractResponseDTO> getContractById(@PathVariable Integer contractId) {
        return ResponseEntity.ok(contractService.getContractById(contractId));
    }
}

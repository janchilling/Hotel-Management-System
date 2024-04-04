package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.services.*;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;
    private final SeasonService seasonService;
    private final MarkupService markupService;
    private final RoomTypeService roomTypeService;
    private final SupplementService supplementService;

    @PostMapping("/")
    public StandardResponse<Contract> createContract(@RequestBody ContractRequestDTO contractRequestDTO){
        return contractService.createContract(contractRequestDTO);
    }

    @GetMapping("{contractId}/roomTypes/")
    public StandardResponse<List<RoomTypeResponseDTO>> getRoomTypeByContract(@PathVariable Integer contractId) {
        return roomTypeService.getRoomTypeByContract(contractId);
    }

    @GetMapping("/{contractId}/supplements/")
    public StandardResponse<List<SupplementResponseDTO>> getSupplementByContract(@PathVariable Integer contractId) {
        return supplementService.getSupplementByContract(contractId);
    }

    @GetMapping("/getContractById/{contractId}")
    public ResponseEntity<ContractResponseDTO> getContractById(@PathVariable Integer contractId) {
        return ResponseEntity.ok(contractService.getContractById(contractId));
    }

    @GetMapping("/{contractId}/seasons")
    public ResponseEntity<List<SeasonResponseDTO>> getSeasonByContract(@PathVariable Integer contractId){
        return ResponseEntity.ok(seasonService.getSeasonByContract(contractId));
    }

    @GetMapping("/{contractId}/markups")
    public ResponseEntity<List<MarkupResponseDTO>> getMarkupByContract(@PathVariable Integer contractId){
        return ResponseEntity.ok(markupService.getMarkupByContract(contractId));
    }
}

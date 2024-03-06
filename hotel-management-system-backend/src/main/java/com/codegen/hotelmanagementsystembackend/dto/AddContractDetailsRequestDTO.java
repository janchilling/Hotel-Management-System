package com.codegen.hotelmanagementsystembackend.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class AddContractDetailsRequestDTO {

    private Integer contractId;
    private Set<AddSupplementRequestDTO> supplements;
}

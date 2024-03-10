package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.SupplementRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Supplement;

import java.util.List;

public interface SupplementService {

    List<Supplement> createSupplement(List<SupplementRequestDTO> supplementRequestDTO);

}

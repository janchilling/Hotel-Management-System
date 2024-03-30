package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.MarkupRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.MarkupResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Markup;
import com.codegen.hotelmanagementsystembackend.util.StandardResponse;

import java.util.List;

public interface MarkupService {

    StandardResponse<Markup> createMarkup(MarkupRequestDTO markupRequestDTOS);

    MarkupResponseDTO getMarkupById(Integer markupId);

    List<MarkupResponseDTO> getMarkupByContract(Integer contractId);
}

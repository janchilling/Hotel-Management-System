package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.MarkupRequestDTO;

import java.util.List;

public interface MarkupService {

    String createMarkup(List<MarkupRequestDTO> markupRequestDTOS);
}

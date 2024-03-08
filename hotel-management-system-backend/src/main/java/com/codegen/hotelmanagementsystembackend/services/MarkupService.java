package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.MarkupRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Markup;

import java.util.List;

public interface MarkupService {

    List<Markup> createMarkup(List<MarkupRequestDTO> markupRequestDTOS);
}

package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.MarkupDTO;
import com.codegen.hotelmanagementsystembackend.entities.Markup;

import java.util.List;

public interface MarkupService {

    String createMarkup(List<MarkupDTO> markupDTOs);
}

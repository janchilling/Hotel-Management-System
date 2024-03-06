package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.MarkupDTO;
import com.codegen.hotelmanagementsystembackend.entities.Markup;

public interface MarkupService {

    String createMarkup(MarkupDTO markupDTO);
}

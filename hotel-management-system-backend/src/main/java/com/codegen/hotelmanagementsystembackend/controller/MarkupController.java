package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.MarkupRequestDTO;
import com.codegen.hotelmanagementsystembackend.entities.Markup;
import com.codegen.hotelmanagementsystembackend.services.MarkupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/markups")
@RequiredArgsConstructor
public class MarkupController {

    private final MarkupService markupService;

    @PostMapping("/addMarkup")
    public ResponseEntity<List<Markup>> createMarkup(@RequestBody List<MarkupRequestDTO> markupRequestDTOS){
        return ResponseEntity.ok(markupService.createMarkup(markupRequestDTOS));
    }
}

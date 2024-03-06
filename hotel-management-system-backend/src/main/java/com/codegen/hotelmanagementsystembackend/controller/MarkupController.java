package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.ContractDTO;
import com.codegen.hotelmanagementsystembackend.dto.MarkupDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;
import com.codegen.hotelmanagementsystembackend.entities.Markup;
import com.codegen.hotelmanagementsystembackend.services.MarkupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/markups")
@RequiredArgsConstructor
public class MarkupController {

    private final MarkupService markupService;

    @PostMapping("/addMarkup")
    public ResponseEntity<String> createMarkup(@RequestBody MarkupDTO markupDTO){
        return ResponseEntity.ok(markupService.createMarkup(markupDTO));
    }
}

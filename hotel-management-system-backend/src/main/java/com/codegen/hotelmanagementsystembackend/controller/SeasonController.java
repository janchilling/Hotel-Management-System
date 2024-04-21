package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.HotelResponseDTO;
import com.codegen.hotelmanagementsystembackend.dto.SeasonResponseDTO;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.services.SeasonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/seasons")
@RequiredArgsConstructor
public class SeasonController {

    private final SeasonService seasonService;

    /**
     * Retrieves a season by its ID.
     *
     * @param  seasonId   the ID of the season to retrieve
     * @return            the response containing the season information
     */
    @GetMapping("/{seasonId}")
    public ResponseEntity<SeasonResponseDTO> getSeasonById(@PathVariable Integer seasonId){
        return ResponseEntity.ok(seasonService.getSeasonById(seasonId));
    }

}

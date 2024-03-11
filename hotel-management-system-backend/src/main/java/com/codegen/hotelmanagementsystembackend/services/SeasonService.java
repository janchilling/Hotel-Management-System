package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.SeasonResponseDTO;

import java.util.List;

public interface SeasonService {

    SeasonResponseDTO getSeasonById(Integer seasonId);

    List<List<SeasonResponseDTO>> getSeasonByHotel(Integer hotelId);

    List<SeasonResponseDTO> getSeasonByContract(Integer contractId);
}

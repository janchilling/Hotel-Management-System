package com.codegen.hotelmanagementsystembackend.services;

import com.codegen.hotelmanagementsystembackend.dto.SeasonResponseDTO;
import com.codegen.hotelmanagementsystembackend.entities.Contract;

import java.util.Date;
import java.util.List;

public interface SeasonService {

    SeasonResponseDTO getSeasonById(Integer seasonId);

    List<List<SeasonResponseDTO>> getSeasonByHotel(Integer hotelId);

    List<SeasonResponseDTO> getSeasonByContract(Integer contractId);

    Integer getSeasonByCheckInOutDates(Contract contract, Date checkInDate, Date checkOutDate);
}

package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.repository.*;
import com.codegen.hotelmanagementsystembackend.services.ContractService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

    private final ContractRepository contractRepository;
    private final DiscountRepository discountRepository;
    private final MarkupRepository markupRepository;
    private final SeasonRepository seasonRepository;
    private final SupplementRepository supplementRepository;
    private final RoomTypeRepository roomTypeRepository;
    @Override
    public Contract addBooking(ContractDTO contractDTO) {

        Contract contract = getContract(contractDTO);

        Contract savedContract = contractRepository.save(contract);

        List<SeasonDTO> seasons = contractDTO.getSeasons();
        if (seasons != null) {
            for (SeasonDTO seasonDTO  : seasons) {
                Season season = new Season();
                season.setSeason_name(seasonDTO.getSeasonName());
                season.setStart_date(seasonDTO.getStartDate());
                season.setEnd_date(seasonDTO.getEndDate());
                season.setContract(savedContract);
                seasonRepository.save(season);
            }
        }

        List<MarkupDTO> markups = contractDTO.getMarkups();
        if (markups != null) {
            for (MarkupDTO markupDTO  : markups) {
                Markup markup = new Markup();
                markup.setContract(savedContract);
                markupRepository.save(markup);
            }
        }

        List<DiscountDTO> discounts = contractDTO.getDiscounts();
        if (discounts != null) {
            for (DiscountDTO discountDTO  : discounts) {
                Discount discount = new Discount();
                discount.setDiscount_name(discountDTO.getDiscountName());
                discount.setDiscount_description(discountDTO.getDiscountDescription());
                discount.setContract(savedContract);
                discountRepository.save(discount);
            }
        }

        List<RoomTypeDTO> roomTypes = contractDTO.getRoomTypes();
        if (roomTypes != null) {
            for (RoomTypeDTO roomTypeDTO  : roomTypes) {
                RoomType roomType = new RoomType();
                roomType.setRoom_type_name(roomTypeDTO.getRoomTypeName());
                roomType.setRoom_dimensions(roomTypeDTO.getRoomDimensions());
                roomType.setRoom_type_price(roomTypeDTO.getRoomTypePrice());
                roomType.setNo_of_rooms(roomTypeDTO.getNumberOfRooms());
                roomType.setMax_adults(roomTypeDTO.getMaxAdults());
                roomType.setContract(savedContract);
                roomTypeRepository.save(roomType);
            }
        }

        List<SupplementDTO> supplements = contractDTO.getSupplements();
        if (roomTypes != null) {
            for (SupplementDTO supplementDTO  : supplements) {
                Supplement supplement = new Supplement();
                supplement.setSupplement_name(supplementDTO.getSupplementName());
                supplement.setSupplement_description(supplementDTO.getSupplementDescription());
                supplement.setSupplement_type(supplementDTO.getSupplementType());
                supplement.setContract(savedContract);
                supplementRepository.save(supplement);
            }
        }



        return savedContract;
    }

    private static Contract getContract(ContractDTO contractDTO) {
        Contract contract = new Contract();

        contract.setStart_date(contractDTO.getStartDate());
        contract.setEnd_date(contractDTO.getEndDate());
        contract.setContract_status(contractDTO.getContractStatus());
        contract.setCancellation_deadline(contractDTO.getCancellationDeadline());
        contract.setCancellation_amount(contractDTO.getCancellationAmount());
        contract.setPrepayment(contractDTO.getPrepayment());
        contract.setBalance_payment(contractDTO.getBalancePayment());
        return contract;
    }
}

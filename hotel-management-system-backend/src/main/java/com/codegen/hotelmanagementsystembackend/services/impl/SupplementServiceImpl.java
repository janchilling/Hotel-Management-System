package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.ContractRepository;
import com.codegen.hotelmanagementsystembackend.repository.SeasonRepository;
import com.codegen.hotelmanagementsystembackend.repository.SupplementRepository;
import com.codegen.hotelmanagementsystembackend.services.SupplementService;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplementServiceImpl implements SupplementService {

    private final ContractRepository contractRepository;
    private final SeasonRepository seasonRepository;
    private final SupplementRepository supplementRepository;
    private final UtilityMethods utilityMethods;
    private final ModelMapper modelMapper;

    /**
     * Create supplements based on the provided SupplementRequestDTOs.
     *
     * @param  supplementRequestDTOs  list of SupplementRequestDTOs
     * @return                       list of created supplements
     */
    @Override
    public List<Supplement> createSupplement(List<SupplementRequestDTO> supplementRequestDTOs) {

        if (supplementRequestDTOs == null || supplementRequestDTOs.isEmpty()) {
            return null;
        }

        List<Supplement> supplementsList = new ArrayList<>();

        try {
            for (SupplementRequestDTO supplementRequestDTO : supplementRequestDTOs) {
                Supplement newSupplement = new Supplement();
                newSupplement.setSupplementDescription(supplementRequestDTO.getSupplementDescription());
                newSupplement.setSupplementName(supplementRequestDTO.getSupplementName());
                newSupplement.setImageIconURL(supplementRequestDTO.getImageIconURL());
                newSupplement.setContract(contractRepository.findById(supplementRequestDTO.getContractId())
                        .orElseThrow(() -> new ResourceNotFoundException("Contract not found with ID: " + supplementRequestDTO.getContractId())));

                for (SeasonSupplementDTO seasonSupplementDTO : supplementRequestDTO.getSeasonSupplements()) {
                    SeasonSupplement seasonSupplement = new SeasonSupplement();
                    seasonSupplement.setSupplement(newSupplement);
                    SeasonSupplementKey seasonSupplementKey = new SeasonSupplementKey();
                    if (seasonSupplementDTO.getSeasonId() != null) {
                        seasonSupplementKey.setSeasonId(seasonSupplementDTO.getSeasonId());
                    }
                    if (newSupplement.getSupplementId() != null) {
                        seasonSupplementKey.setSupplementId(newSupplement.getSupplementId());
                    }
                    seasonSupplement.setSeasonSupplementKey(seasonSupplementKey);
                    seasonSupplement.setSupplementPrice(seasonSupplementDTO.getSupplementPrice());
                    seasonSupplement.setSeason(seasonRepository.findById(seasonSupplementDTO.getSeasonId())
                            .orElseThrow(() -> new ResourceNotFoundException("Season not found with ID: " + seasonSupplementDTO.getSeasonId())));

                    newSupplement.getSupplementsSeasons().add(seasonSupplement);
                }
                supplementsList.add(newSupplement);
            }

            return supplementRepository.saveAll(supplementsList);

        }

        catch (Exception e) {
            throw new ServiceException("Error while creating supplements: " + e.getMessage());
        }}

    /**
     * Retrieves a supplement by its ID and constructs a response DTO containing detailed information about the supplement, its associated contract, and the corresponding hotel.
     *
     * @param  supplementId   the ID of the supplement to retrieve
     * @return                the response DTO containing the supplement details
     */
    @Override
    public SupplementResponseDTO getSupplementById(Integer supplementId) {
        try{
            Supplement supplement = utilityMethods.getSupplement(supplementId);
            Contract contract = utilityMethods.getContract(supplement.getContract().getContractId());
            Hotel hotel = utilityMethods.getHotel(contract.getHotel().getHotelId());

            SupplementResponseDTO supplementResponseDTO = modelMapper.map(supplement, SupplementResponseDTO.class);
            supplementResponseDTO.setSeasonSupplements(supplement.getSupplementsSeasons().stream().map(
                    seasonSupplement -> {
                        Season season = utilityMethods.getSeason(seasonSupplement.getSeason().getSeasonId());
                        SeasonSupplementResponseDTO seasonSupplementResponseDTO = modelMapper.map(seasonSupplement, SeasonSupplementResponseDTO.class);
                        seasonSupplementResponseDTO.setSeasonName(season.getSeasonName());
                        seasonSupplementResponseDTO.setStartDate(season.getStartDate());
                        seasonSupplementResponseDTO.setEndDate(season.getEndDate());
                        return seasonSupplementResponseDTO;
                    }).toList());

            supplementResponseDTO.setContractId(contract.getContractId());
            supplementResponseDTO.setContractStatus(contract.getContractStatus());
            supplementResponseDTO.setHotelId(hotel.getHotelId());
            supplementResponseDTO.setHotelName(hotel.getHotelName());

            return supplementResponseDTO;

        }catch (Exception e){
            throw new ServiceException("Supplement search failed");
        }
    }

    /**
     * Retrieves a list of supplements by contract ID.
     * @param contractId The ID of the contract
     * @return A list of SupplementResponseDTO objects
     * @throws ServiceException if the supplement search fails
     */
    @Override
    public List<SupplementResponseDTO> getSupplementByContract(Integer contractId) {
        try{
            // Retrieve supplements from the repository based on the contract ID
            List<Supplement> supplementList =  supplementRepository.findAllSupplementsByContractContractId(contractId);
            // If the supplement list is empty, return null
            if (supplementList.isEmpty()){
                return null;
            }
            // Map each Supplement object to a SupplementResponseDTO object and collect them into a list
            return supplementList.stream().map(supplement -> getSupplementById(supplement.getSupplementId())).toList();

        }catch (Exception e){
            // Throw a ServiceException with a message if the supplement search fails
            throw new ServiceException("Supplement search failed");
        }
    }

    /**
     * Retrieve the list of supplements for a given hotel by hotelId.
     *
     * @param hotelId the ID of the hotel
     * @return a list of supplement response DTOs
     * @throws ResourceNotFoundException if no contracts are found for the hotel
     * @throws ServiceException if the supplement search fails
     */
    @Override
    public List<List<SupplementResponseDTO>> getSupplementByHotel(Integer hotelId) {
        try {
            // Retrieve all contracts for the given hotelId
            List<Contract> contractList = contractRepository.findAllContractsByHotelHotelId(hotelId);

            // If no contracts are found, throw a ResourceNotFoundException
            if (contractList.isEmpty()) {
                throw new ResourceNotFoundException("No contracts found for the hotel" + hotelId);
            }

            // Map each contract to a list of supplement response DTOs and collect them into a list
            return contractList.stream()
                    .map(contract ->
                            getSupplementByContract(contract.getContractId())
                    )
                    .collect(Collectors.toList());

        } catch (Exception e) {
            // Throw a ServiceException if the supplement search fails
            throw new ServiceException("Supplement search failed");
        }
    }
}


//    @Override
//    public String addContractDetails(AddContractDetailsRequestDTO addContractDetailsRequestDTO) {
//
//        Contract contract = contractRepository.getReferenceById(addContractDetailsRequestDTO.getContractId());
//        Set<Supplement> supplementsSet = new HashSet<>();
//
//        Set<AddSupplementRequestDTO> supplements = addContractDetailsRequestDTO.getSupplements();
//        System.out.println(supplements);
//        if (supplements != null) {
//            for (AddSupplementRequestDTO supplementsDTO  : supplements) {
//                Supplement supplement = new Supplement();
//                supplement.setSupplementType(supplementsDTO.getSupplementType());
//                supplement.setSupplementDescription(supplementsDTO.getSupplementDescription());
//                supplement.setSupplementName(supplementsDTO.getSupplementName());
//                supplement.setContract(contract);
//                supplementsSet.add(supplement);
//            }
//
//            supplementRepository.saveAll(supplementsSet);
//
//            for (AddSupplementRequestDTO supplementsDTO  : supplements) {
//
//                SeasonSupplement seasonSupplement = new SeasonSupplement();
//                Supplement supplement = supplementRepository.findBySupplementNameAndContract(
//                        supplementsDTO.getSupplementName(), contract);
//
//                seasonSupplement.setSeason(seasonRepository.getReferenceById(supplementsDTO.getSeasonId()));
//                seasonSupplement.setSupplement(supplement);
//                seasonSupplement.setSupplement_price(supplementsDTO.getSupplementPrice());
//                seasonSupplementRepository.save(seasonSupplement);
//            }
//
//
//        }
//        return "Contract Details Added!";

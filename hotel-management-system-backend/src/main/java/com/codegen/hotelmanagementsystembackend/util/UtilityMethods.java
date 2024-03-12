package com.codegen.hotelmanagementsystembackend.util;

import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UtilityMethods {

    private final SeasonRepository seasonRepository;
    private final ContractRepository contractRepository;
    private final HotelRepository hotelRepository;
    private final DiscountRepository discountRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final SupplementRepository supplementRepository;
    private final PaymentRepository paymentRepository;
    private final CustomerRepository customerRepository;
    private final BookingRepository bookingRepository;

    public Season getSeason(Integer seasonId) {
        return seasonRepository.findById(seasonId)
                .orElseThrow(() -> new ResourceNotFoundException("Season not found" + seasonId));
    }

    public Contract getContract(Integer contractId) {
        return contractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found" + contractId));
    }

    public Hotel getHotel(Integer hotelId) {
        return hotelRepository.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found" + hotelId));
    }

    public Discount getDiscount(Integer discountId) {
        return discountRepository.findById(discountId)
                .orElseThrow(() -> new ResourceNotFoundException("Discount not found" + discountId));
    }

    public RoomType getRoomType(Integer roomTypeId) {
        return roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Room Type not found" + roomTypeId));
    }

    public Supplement getSupplement(Integer supplementId) {
        return supplementRepository.findById(supplementId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplement not found" + supplementId));
    }

    public Payment getPayment(Integer paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found" + paymentId));
    }

    public Customer getCustomer(Long customerId){
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found" + customerId));
    }

    public Booking getBooking(Integer bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found" + bookingId));
    }
}

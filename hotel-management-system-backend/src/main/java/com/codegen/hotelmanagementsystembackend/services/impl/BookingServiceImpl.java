package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.*;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.*;
import com.codegen.hotelmanagementsystembackend.services.BookingService;
import com.codegen.hotelmanagementsystembackend.util.UtilityMethods;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ModelMapper modelMapper;
    private final UtilityMethods utilityMethods;

    /**
     * Create a booking based on the provided booking request data, including customer, hotel, payments, rooms, discounts, and supplements.
     *
     * @param  bookingRequestDTO   the booking request data transfer object
     * @return                     the created booking
     */
    @Override
    public Booking createBooking(BookingRequestDTO bookingRequestDTO) {
        try {
            Customer customer = utilityMethods.getCustomer(bookingRequestDTO.getCustomerId());
            Integer hotelId = bookingRequestDTO.getHotelId();

            Hotel hotel = utilityMethods.getHotel(hotelId);

            Booking booking = modelMapper.map(bookingRequestDTO, Booking.class);
            booking.setHotel(hotel);
            booking.setCustomer(customer);

            Payment newPayment = modelMapper.map(bookingRequestDTO.getPayment(), Payment.class);
            newPayment.setCustomer(customer);
            booking.getPayments().add(newPayment);

            bookingRequestDTO.getBookingRooms().stream()
                    .map(bookingRoomDTO -> {
                        BookingRoom newBookingRoom = modelMapper.map(bookingRoomDTO, BookingRoom.class);
                        newBookingRoom.setBooking(booking);
                        newBookingRoom.setRoomType(utilityMethods.getRoomType(bookingRoomDTO.getRoomTypeId()));
                        return newBookingRoom;
                    })
                    .forEach(bookingRoom -> booking.getRooms().add(bookingRoom));

            bookingRequestDTO.getBookingDiscounts().stream()
                    .map(bookingDiscountDTO -> {
                        BookingDiscount newbookingDiscount = modelMapper.map(bookingDiscountDTO, BookingDiscount.class);
                        newbookingDiscount.setBooking(booking);
                        newbookingDiscount.setDiscount(utilityMethods.getDiscount(bookingDiscountDTO.getDiscountId()));
                        return newbookingDiscount;
                    })
                    .forEach(bookingDiscount -> booking.getDiscounts().add(bookingDiscount));

            bookingRequestDTO.getBookingSupplements().stream()
                    .map(bookingSupplementDTO -> {
                        BookingSupplements newBookingSupplement = modelMapper.map(bookingSupplementDTO, BookingSupplements.class);
                        newBookingSupplement.setBooking(booking);
                        newBookingSupplement.setSupplement(utilityMethods.getSupplement(bookingSupplementDTO.getSupplementId()));
                        return newBookingSupplement;
                    })
                    .forEach(bookingSupplement -> booking.getSupplements().add(bookingSupplement));

            return bookingRepository.save(booking);
        } catch (Exception e) {
            throw new ServiceException("Failed to create Bookings", e);
        }
    }

    @Override
    public BookingResponseDTO getBookingById(Integer bookingId) {
        try{

            Booking booking = utilityMethods.getBooking(bookingId);
            if (booking == null) {
                throw new ResourceNotFoundException("Booking not found with ID: " + bookingId);
            }

            BookingResponseDTO bookingResponseDTO = modelMapper.map(booking, BookingResponseDTO.class);
            bookingResponseDTO.setCustomerId(booking.getCustomer().getUser_id());
            bookingResponseDTO.setCustomerName(booking.getCustomer().getCustomer_fname() + " " + booking.getCustomer().getCustomer_lname());
            bookingResponseDTO.setDiscounts(booking.getDiscounts().stream().map(
                    bookingDiscount -> modelMapper.map(bookingDiscount, BookingDiscountResponseDTO.class)
            ).toList());
            bookingResponseDTO.setSupplements(booking.getSupplements().stream().map(
                    bookingSupplement -> modelMapper.map(bookingSupplement, BookingSupplementResponseDTO.class)
            ).toList());
            bookingResponseDTO.setRooms(booking.getRooms().stream().map(
                    room -> modelMapper.map(room, BookingRoomResponseDTO.class)
            ).toList());

            return bookingResponseDTO;

        }catch (Exception e){
            throw new ServiceException("Booking search failed");
        }
    }
}

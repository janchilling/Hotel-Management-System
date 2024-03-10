package com.codegen.hotelmanagementsystembackend.services.impl;

import com.codegen.hotelmanagementsystembackend.dto.BookingDiscountDTO;
import com.codegen.hotelmanagementsystembackend.dto.BookingRequestDTO;
import com.codegen.hotelmanagementsystembackend.dto.BookingRoomDTO;
import com.codegen.hotelmanagementsystembackend.dto.BookingSupplementDTO;
import com.codegen.hotelmanagementsystembackend.entities.*;
import com.codegen.hotelmanagementsystembackend.exception.ResourceNotFoundException;
import com.codegen.hotelmanagementsystembackend.repository.*;
import com.codegen.hotelmanagementsystembackend.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final HotelRepository hotelRepository;
    private final CustomerRepository customerRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final DiscountRepository discountRepository;
    private final SupplementRepository supplementRepository;
    private final BookingRepository bookingRepository;

    /**
     * Create a booking based on the provided booking request data, including customer, hotel, payments, rooms, discounts, and supplements.
     *
     * @param  bookingRequestDTO   the booking request data transfer object
     * @return                     the created booking
     */
    @Override
    public Booking createBooking(BookingRequestDTO bookingRequestDTO) {
        try{
            Customer customer = customerRepository.findById(bookingRequestDTO.getCustomerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + bookingRequestDTO.getCustomerId()));

            Booking booking = new Booking();


            booking.setBookingId(bookingRequestDTO.getBookingId());
            booking.setBookingDate(bookingRequestDTO.getBookingDate());
            booking.setCheckInDate(bookingRequestDTO.getCheckInDate());
            booking.setCheckOutDate(bookingRequestDTO.getCheckOutDate());
            booking.setFinalBookingPrice(bookingRequestDTO.getFinalBookingPrice());
            booking.setNoOfAdults(bookingRequestDTO.getNoOfAdults());
            booking.setNoOfChildren(bookingRequestDTO.getNoOfChildren());
            booking.setBookingStatus(bookingRequestDTO.getBookingStatus());
            booking.setPaymentStatus(bookingRequestDTO.getPaymentStatus());
            booking.setHotel(hotelRepository.findById(bookingRequestDTO.getHotelId())
                    .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: " + bookingRequestDTO.getHotelId())));
            booking.setCustomer(customer);

            Payment newPayment = new Payment();
            newPayment.setBooking(booking);
            newPayment.setPaymentAmount(bookingRequestDTO.getPayment().getPaymentAmount());
            newPayment.setPaymentType(bookingRequestDTO.getPayment().getPaymentType());
            newPayment.setPaymentDate(bookingRequestDTO.getPayment().getPaymentDate());
            newPayment.setCustomer(customer);

            booking.getPayments().add(newPayment);

            for(BookingRoomDTO bookingRoomDTO : bookingRequestDTO.getBookingRooms()) {
                BookingRoom newBookingRoom = new BookingRoom();
                newBookingRoom.setBooking(booking);
                newBookingRoom.setBookedPrice(bookingRoomDTO.getBookedPrice());
                newBookingRoom.setNoOfRooms(bookingRoomDTO.getNoOfRooms());
                newBookingRoom.setRoomTypeName(bookingRoomDTO.getRoomTypeName());
                newBookingRoom.setRoomType(roomTypeRepository.findById(bookingRoomDTO.getRoomTypeId())
                        .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + bookingRoomDTO.getRoomTypeId())));
                booking.getRooms().add(newBookingRoom);

            }

            for(BookingDiscountDTO bookingDiscountDTO : bookingRequestDTO.getBookingDiscounts()) {
                BookingDiscount newbookingDiscount = new BookingDiscount();
                newbookingDiscount.setBooking(booking);
                newbookingDiscount.setDiscountName(bookingDiscountDTO.getDiscountName());
                newbookingDiscount.setDiscountedAmount(bookingDiscountDTO.getDiscountedAmount());
                newbookingDiscount.setDiscountName(bookingDiscountDTO.getDiscountName());
                newbookingDiscount.setDiscount(discountRepository.findById(bookingDiscountDTO.getDiscountId())
                        .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: " + bookingDiscountDTO.getDiscountId())));
                booking.getDiscounts().add(newbookingDiscount);
            }

            for(BookingSupplementDTO bookingSupplementDTO : bookingRequestDTO.getBookingSupplements()) {
                BookingSupplements newBookingSupplement = new BookingSupplements();
                newBookingSupplement.setBooking(booking);
                newBookingSupplement.setSupplementName(bookingSupplementDTO.getSupplementName());
                newBookingSupplement.setSupplementPrice(bookingSupplementDTO.getSupplementPrice());
                newBookingSupplement.setSupplement(supplementRepository.findById(bookingSupplementDTO.getSupplementId())
                        .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: " + bookingSupplementDTO.getSupplementId())));
                booking.getSupplements().add(newBookingSupplement);
            }

            return bookingRepository.save(booking);
        }
        catch (Exception e){
            throw new ServiceException("Failed to create Bookings", e);
        }
    }
}

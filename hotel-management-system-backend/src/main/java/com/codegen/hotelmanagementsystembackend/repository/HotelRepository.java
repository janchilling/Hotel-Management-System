package com.codegen.hotelmanagementsystembackend.repository;

import com.codegen.hotelmanagementsystembackend.entities.Discount;
import com.codegen.hotelmanagementsystembackend.entities.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {

    boolean existsByHotelNameAndHotelStreetAddress(String hotelName, String hotelStreetAddress);


    List<Hotel> findByHotelNameContainingOrHotelCityContainingOrHotelCountryContaining(String name, String city, String country);


}


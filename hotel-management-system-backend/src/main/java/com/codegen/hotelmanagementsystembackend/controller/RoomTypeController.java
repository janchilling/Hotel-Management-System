package com.codegen.hotelmanagementsystembackend.controller;

import com.codegen.hotelmanagementsystembackend.dto.MarkupDTO;
import com.codegen.hotelmanagementsystembackend.dto.RoomTypeDTO;
import com.codegen.hotelmanagementsystembackend.services.MarkupService;
import com.codegen.hotelmanagementsystembackend.services.RoomTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roomTypes")
@RequiredArgsConstructor
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    @PostMapping("/addRoomType")
    public ResponseEntity<String> createRoomType(@RequestBody List<RoomTypeDTO> roomTypeDTOS){
        return ResponseEntity.ok(roomTypeService.createRoomType(roomTypeDTOS));
    }
}

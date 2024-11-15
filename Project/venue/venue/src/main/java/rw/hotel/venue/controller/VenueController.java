package rw.hotel.venue.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.hotel.venue.model.Venue;
import rw.hotel.venue.service.Venueservice;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5501", "http://localhost:3000",
        "http://127.0.0.1:5500" }, allowedHeaders = "*")
@RequestMapping("/api/venues")
public class VenueController {
    @Autowired
    private Venueservice venueService;

    @GetMapping
    public ResponseEntity<List<Venue>> getAllVenues() {
        List<Venue> venues = venueService.getAllVenues();
        return new ResponseEntity<>(venues, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
        Optional<Venue> venue = venueService.getVenueById(id);
        return venue.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Object> createVenue(@RequestBody Venue venue) {
        Venue createdVenue = venueService.createVenue(venue);
        return new ResponseEntity<>(new ResponseMessage("Venue created successfully", createdVenue),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateVenue(@PathVariable Long id, @RequestBody Venue venue) {
        Optional<Venue> existingVenue = venueService.getVenueById(id);
        if (existingVenue.isPresent()) {
            venue.setId(id);
            Venue updatedVenue = venueService.updateVenue(venue);
            return new ResponseEntity<>(new ResponseMessage("Venue updated successfully", updatedVenue), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseMessage("Venue not found", null), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteVenue(@PathVariable Long id) {
        Optional<Venue> existingVenue = venueService.getVenueById(id);
        if (existingVenue.isPresent()) {
            venueService.deleteVenue(id);
            return new ResponseEntity<>(
                    new ResponseMessage("Venue deleted successfully", existingVenue.get()),
                    HttpStatus.OK // 200 OK
            );
        } else {
            return new ResponseEntity<>(
                    new ResponseMessage("Venue not found", null),
                    HttpStatus.NOT_FOUND);
        }
    }

    // ResponseMessage class to standardize messages and responses
    public static class ResponseMessage {
        private String message;
        private Object data;

        public ResponseMessage(String message, Object data) {
            this.message = message;
            this.data = data;
        }

        // Getters and setters
        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Object getData() {
            return data;
        }

        public void setData(Object data) {
            this.data = data;
        }
    }
}

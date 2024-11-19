package rw.hotel.venue.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.hotel.venue.model.Venue;
import rw.hotel.venue.service.Venueservice;
import rw.hotel.venue.security.jwt.JwtUtil;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = "http://127.0.0.1:5501", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.DELETE, RequestMethod.OPTIONS })
public class VenueController {

    @Autowired
    private Venueservice venueService;

    @Autowired
    private JwtUtil jwtUtil;

    // Get all venues
    @GetMapping
    public ResponseEntity<List<Venue>> getAllVenues() {
        List<Venue> venues = venueService.getAllVenues();
        return new ResponseEntity<>(venues, HttpStatus.OK);
    }

    // Get a venue by ID
    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
        Optional<Venue> venue = venueService.getVenueById(id);
        return venue.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create a venue
    @PostMapping
    public ResponseEntity<?> createVenue(@RequestHeader("Authorization") String authorizationHeader,
            @RequestBody Venue venue) {
        try {
            validateAuthorizationHeader(authorizationHeader);
            Claims claims = extractClaimsFromHeader(authorizationHeader);
            String userRole = claims.get("role", String.class);

            if (!"ADMIN".equals(userRole) && !"MANAGER".equals(userRole)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new ResponseMessage("Access denied: Insufficient privileges", null));
            }

            Venue createdVenue = venueService.createVenue(venue);
            return new ResponseEntity<>(new ResponseMessage("Venue created successfully", createdVenue),
                    HttpStatus.CREATED);

        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseMessage("Invalid or expired token", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessage("An error occurred while creating the venue", null));
        }
    }

    // Update a venue
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVenue(@RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long id, @RequestBody Venue venue) {
        try {
            validateAuthorizationHeader(authorizationHeader);
            Claims claims = extractClaimsFromHeader(authorizationHeader);
            String userRole = claims.get("role", String.class);

            if (!"ADMIN".equals(userRole) && !"MANAGER".equals(userRole)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new ResponseMessage("Access denied: Insufficient privileges", null));
            }

            Optional<Venue> existingVenue = venueService.getVenueById(id);
            if (existingVenue.isPresent()) {
                venue.setId(id);
                Venue updatedVenue = venueService.updateVenue(venue);
                return new ResponseEntity<>(new ResponseMessage("Venue updated successfully", updatedVenue),
                        HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ResponseMessage("Venue not found", null), HttpStatus.NOT_FOUND);
            }

        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseMessage("Invalid or expired token", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessage("An error occurred while updating the venue", null));
        }
    }

    // Delete a venue
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5501")
    public ResponseEntity<?> deleteVenue(@RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long id) {
        try {
            validateAuthorizationHeader(authorizationHeader);
            Claims claims = extractClaimsFromHeader(authorizationHeader);
            String userRole = claims.get("role", String.class);

            if (!"ADMIN".equals(userRole)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new ResponseMessage("Access denied: Only ADMIN can delete venues", null));
            }

            Optional<Venue> existingVenue = venueService.getVenueById(id);
            if (existingVenue.isPresent()) {
                venueService.deleteVenue(id);
                return new ResponseEntity<>(new ResponseMessage("Venue deleted successfully", existingVenue.get()),
                        HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ResponseMessage("Venue not found", null), HttpStatus.NOT_FOUND);
            }

        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseMessage("Invalid or expired token", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessage("An error occurred while deleting the venue", null));
        }
    }

    // Validate Authorization header
    private void validateAuthorizationHeader(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new JwtException("Authorization header is missing or invalid");
        }
    }

    // Extract Claims from JWT token in the Authorization header
    private Claims extractClaimsFromHeader(String authorizationHeader) {
        String jwtToken = authorizationHeader.substring(7); // Extract token after "Bearer "
        return jwtUtil.extractClaims(jwtToken);
    }

    // ResponseMessage inner class
    public static class ResponseMessage {
        private String message;
        private Object data;

        public ResponseMessage(String message, Object data) {
            this.message = message;
            this.data = data;
        }

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

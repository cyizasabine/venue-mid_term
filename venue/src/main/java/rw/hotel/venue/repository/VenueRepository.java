package rw.hotel.venue.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.hotel.venue.model.Venue;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
}
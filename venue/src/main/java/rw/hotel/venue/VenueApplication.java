package rw.hotel.venue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"rw.hotel.venue.model"})

@EnableJpaRepositories(basePackages = {"rw.hotel.venue.repository"})
public class VenueApplication {

    public static void main(String[] args) {
        SpringApplication.run(VenueApplication.class, args);
    }
}
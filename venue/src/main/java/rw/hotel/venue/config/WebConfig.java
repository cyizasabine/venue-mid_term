package rw.hotel.venue.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Applies to all endpoints
                .allowedOrigins(
                        "http://127.0.0.1:5501", 
                        "http://localhost:8080",
                        "http://localhost:5173",
                        "http://localhost:3000",
                        "http://127.0.0.1:5500")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Authorization", "Content-Type", "X-Requested-With", "Accept")
                .exposedHeaders("Authorization") // Exposes the Authorization header in responses
                .allowCredentials(true) // Allows sending cookies or credentials
                .maxAge(3600); // Cache preflight response for 1 hour

        
    }
}

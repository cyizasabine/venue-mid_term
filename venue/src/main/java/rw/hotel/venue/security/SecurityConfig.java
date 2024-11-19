package rw.hotel.venue.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Custom CORS
                                                                                                   // configuration
                                .csrf(csrf -> csrf.disable()) // Disable CSRF protection for stateless APIs
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(
                                                                "/api/users/signup",
                                                                "/api/users/login",
                                                                "/auth/forgot-password",
                                                                "/auth/reset-password",
                                                                "/api/bookings/",
                                                                "/api/bookings/**",
                                                                "/api/venues/**",
                                                                "/public/**")
                                                .permitAll()
                                                .anyRequest().authenticated() // All other requests require
                                                                              // authentication
                                );

                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(List.of(
                                "http://127.0.0.1:5501",
                                "http://localhost:8080",
                                "http://localhost:3000",
                                "http://127.0.0.1:5500",
                                "http://localhost:5173"));
                configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Accept"));
                configuration.setExposedHeaders(List.of("Authorization"));
                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}

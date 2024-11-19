package rw.hotel.venue.security.User;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rw.hotel.venue.model.User;
import rw.hotel.venue.repository.UserRepository;
@Service
@RequiredArgsConstructor
public class VenueManagmentSystem implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
return VenueManagement.buildUserDetails(user);
}

}

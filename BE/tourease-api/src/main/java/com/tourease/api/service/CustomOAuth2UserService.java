package com.tourease.api.service;

import com.tourease.api.entity.User;
import com.tourease.api.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        String sub = (String) attributes.get("sub"); // Google user id

        // Check if user exists
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            // Create new user
            User newUser = User.builder()
                    .userName(email)
                    .email(email)
                    .password("") // Không cần password khi login Google
                    .provider("GOOGLE")
                    .providerId(sub)
                    .role(User.Role.USER)
                    .isActive(User.ActiveStatus.Y)
                    .status(User.UserStatus.B)
                    .createDate(LocalDateTime.now())
                    .build();
            return userRepository.save(newUser);
        });

        return new DefaultOAuth2User(
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())),
                attributes,
                "sub"
        );
    }
}

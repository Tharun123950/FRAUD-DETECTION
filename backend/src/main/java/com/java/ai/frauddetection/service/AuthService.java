package com.java.ai.frauddetection.service;

import com.java.ai.frauddetection.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    public User login(String email, String password) {
        // Pre-configured Admin Credentials
        if ("sreehasa2007@gmail.com".equals(email) && "sreehasa2007".equals(password)) {
            return new User(1L, "sreehasa2007@gmail.com", "sreehasa2007", true);
        }
        throw new RuntimeException("Invalid Admin Credentials");
    }
}

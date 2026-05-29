package com.smartbasket.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private String refreshToken;
    private Long expiresIn;
    private String userId;
    private String name;
    private String email;
    private String role;
    private String avatarUrl;
}

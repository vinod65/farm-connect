package com.farmconnect.security;

import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

@Component
public class JwtUtil {
	
	@Value("${jwt.secret}")
	private String secret;

	private SecretKey key;
	
	 @PostConstruct
	    public void init() {
	        key = Keys.hmacShaKeyFor(secret.getBytes());
	    }


    public String generateToken(
            String email,
            String role) {

        return Jwts.builder()

                .subject(email)

                .claim(
                    "role",
                    role
                )

                .issuedAt(
                    new Date()
                )

                .expiration(
                    new Date(
                        System.currentTimeMillis()
                        + 86400000
                    )
                )

                .signWith(key)

                .compact();
    }

    public String extractEmail(
            String token) {

        Claims claims =
            Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload();

        return claims.getSubject();
    }
    
    public String extractRole(
            String token) {

        Claims claims =
            Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload();

        return claims.get(
                "role",
                String.class
        );
    }

    public boolean validateToken(
            String token) {

        try {

            Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}

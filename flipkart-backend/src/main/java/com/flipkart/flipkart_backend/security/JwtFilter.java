package com.flipkart.flipkart_backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        // 1. Read the Authorization header
        final String authHeader = request.getHeader("Authorization");
        String email = null;
        String jwtToken = null;

        // 2. Check if the header exists and starts with "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // 3. Extract the JWT token (remove "Bearer " from the string)
            jwtToken = authHeader.substring(7);
            
            try {
                // 4. Get the email from the token
                email = jwtUtil.extractEmail(jwtToken);
            } catch (Exception e) {
                System.out.println("Invalid JWT token: " + e.getMessage());
            }
        }

        // If we found an email and the user is not yet authenticated in this request
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // 5. Validate the token
            if (jwtUtil.validateToken(jwtToken, email)) {
                
                // 6. Create an authenticated user in SecurityContextHolder
                // We use an empty ArrayList for roles/authorities for now
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        email, null, new ArrayList<>()
                );
                
                // Add request details to the token
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Save the authentication in the SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        // 7. Continue the filter chain
        filterChain.doFilter(request, response);
    }
}

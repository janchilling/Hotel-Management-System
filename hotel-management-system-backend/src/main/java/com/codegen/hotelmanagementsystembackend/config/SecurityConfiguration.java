package com.codegen.hotelmanagementsystembackend.config;

import com.codegen.hotelmanagementsystembackend.entities.Role;
import com.codegen.hotelmanagementsystembackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JWTAuthenticationFilter jwtAuthenticationFilter;

    private final UserService userService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/products/**").permitAll()
                        .requestMatchers("/api/v1/user").permitAll()
                        .requestMatchers("/api/v1/admin").hasAnyAuthority(Role.SYSTEM_ADMIN.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/contracts/**","/api/v1/markups/**", "/api/v1/discounts/**", "/api/v1/seasons/**", "/api/v1/roomTypes/**",
                                                          "/api/v1/hotels/**", "/api/v1/supplements/**").hasAnyAuthority(Role.SYSTEM_ADMIN.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/bookings/**", "/api/v1/payments/**").hasAnyAuthority(Role.CUSTOMER.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/contracts/**","/api/v1/markups/**", "/api/v1/discounts/**", "/api/v1/seasons/**", "/api/v1/roomTypes/**",
                                                         "/api/v1/hotels/**", "/api/v1/supplements/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/bookings/**", "/api/v1/payments/**").hasAnyAuthority(Role.CUSTOMER.name(), Role.SYSTEM_ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/contracts/**","/api/v1/markups/**", "/api/v1/discounts/**", "/api/v1/seasons/**", "/api/v1/roomTypes/**",
                                                         "/api/v1/hotels/**", "/api/v1/supplements/**").hasAnyAuthority(Role.SYSTEM_ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/bookings/**", "/api/v1/payments/**").hasAnyAuthority(Role.CUSTOMER.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/contracts/**","/api/v1/markups/**", "/api/v1/discounts/**", "/api/v1/seasons/**", "/api/v1/roomTypes/**",
                                "/api/v1/hotels/**", "/api/v1/supplements/**").hasAnyAuthority(Role.SYSTEM_ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/bookings/**", "/api/v1/payments/**").hasAnyAuthority(Role.CUSTOMER.name())
                        .requestMatchers("/api/v1/customers/**").hasAnyAuthority(Role.CUSTOMER.name(), Role.SYSTEM_ADMIN.name())
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/swagger-resources/**").permitAll()
                        .anyRequest().authenticated())
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()).addFilterBefore(
                        jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class
                );
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();

        authenticationProvider.setUserDetailsService(userService.userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}

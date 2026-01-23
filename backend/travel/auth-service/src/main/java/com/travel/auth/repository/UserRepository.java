package com.travel.auth.repository;

import com.travel.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // This method is magic. Spring Data JPA automatically generates the SQL 
    // to find a user where the 'email' column matches the argument.
    Optional<User> findByEmail(String email);
    
}
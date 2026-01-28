package com.tourease.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUserName(String userName);

	Optional<User> findByEmail(String email);
	
	/**
     * Đếm tổng số user
     */
    @Query("SELECT COUNT(u) FROM User u")
    Integer countAllUsers();

    /**
     * Đếm số user active
     */
    @Query("SELECT COUNT(u) FROM User u WHERE u.isActive = 'Y'")
    Integer countActiveUsers();
}

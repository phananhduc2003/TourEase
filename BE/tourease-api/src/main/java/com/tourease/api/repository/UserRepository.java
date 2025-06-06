package com.tourease.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}

package com.tourease.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Chat;




@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

}

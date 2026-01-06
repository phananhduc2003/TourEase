package com.tourease.api.repository;

import com.tourease.api.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Integer> {
    
    List<ChatHistory> findByUserUserIDOrderByCreatedAtAsc(Integer userID);
    
    void deleteByUserUserID(Integer userID);
}
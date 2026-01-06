package com.tourease.api.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tourease.api.entity.Tour;
import com.tourease.api.repository.TourRepository;

@Service
public class ChatService {
    
    @Autowired
    private TourRepository tourRepository;
    
    @Autowired
    private GeminiService geminiService;
    
    /**
     * Xử lý tin nhắn từ user và trả về câu trả lời từ Gemini
     */
    public String handleMessage(String message) {
        boolean isTourQuestion = isTourRelated(message);
        
        String prompt;
        
        if(isTourQuestion) {
            List<Tour> tours = tourRepository.findTop25ByOrderByTourIDAsc();
            
            String context = buildTourContext(tours);
            
            prompt = """
                Bạn là chatbot tư vấn tour du lịch.
                Dưới đây là dữ liệu tour trong hệ thống:
                %s
                Câu hỏi người dùng:
                "%s"
                Hãy trả lời dựa trên dữ liệu trên.
                Nếu không có tour phù hợp, hãy nói rõ.
                """.formatted(context, message);
            
        } else {
             prompt = """
                Bạn là chatbot tư vấn du lịch.
                Hãy trả lời câu hỏi sau một cách ngắn gọn, dễ hiểu:
                "%s"
                """.formatted(message);
        }
        
        return geminiService.callGemini(prompt);    
    }
    
    private boolean isTourRelated(String message) {
        String msg = message.toLowerCase();
        return msg.contains("tour")
                || msg.contains("giá")
                || msg.contains("đi")
                || msg.contains("ngày")
                || msg.contains("đêm")
                || msg.contains("địa điểm")
                || msg.contains("đặt")
                || msg.contains("booking");
    }
    
    private String buildTourContext(List<Tour> tours) {
        StringBuilder sb = new StringBuilder();
        for (Tour tour : tours) {
            sb.append("- ")
              .append(tour.getTitle())
              .append(", Điểm đến: ").append(tour.getDestination())
              .append(", Giá: ").append(tour.getPriceAdult())
              .append(", Thời gian: ").append(tour.getDuration())
              .append("\n");
        }
        return sb.toString();
    }
}
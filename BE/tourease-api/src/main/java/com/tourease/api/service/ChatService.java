package com.tourease.api.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
    public Map<String, Object> handleMessage(String message) {
        Map<String, Object> response = new HashMap<>();
        
        // Phân loại câu hỏi
        QuestionType questionType = classifyQuestion(message);
        
        if (questionType == QuestionType.INFORMATION_QUERY) {
            // LOẠI 1: HỎI THÔNG TIN VỀ ĐỊA ĐIỂM - KHÔNG HIỂN THỊ TOUR
            String prompt = String.format("""
                Bạn là chatbot tư vấn du lịch chuyên nghiệp của TourEase.
                
                Câu hỏi: "%s"
                
                Hãy trả lời thông tin chi tiết, hữu ích về:
                - Địa điểm tham quan nổi tiếng
                - Hoạt động vui chơi
                - Ẩm thực đặc sản
                - Thời điểm nên đi
                - Kinh nghiệm du lịch
                
                Trả lời 3-5 câu, thân thiện và chi tiết.
                Cuối cùng, gợi ý nhẹ: "Nếu bạn muốn tìm tour, mình có thể gợi ý cho bạn nhé!"
                """, message);
            
            String aiResponse = geminiService.callGemini(prompt);
            response.put("message", aiResponse);
            
        } else if (questionType == QuestionType.TOUR_SEARCH) {
            // LOẠI 2: TÌM/ĐẶT TOUR - HIỂN THỊ TOUR
            List<Tour> tours = tourRepository.findTop25ByOrderByTourIDAsc();
            QueryIntent intent = analyzeQueryIntent(message);
            List<Tour> filteredTours = filterToursAdvanced(tours, intent);
            
            if (!filteredTours.isEmpty()) {
                String context = buildDetailedTourContext(filteredTours, intent);
                
                String prompt = String.format("""
                    Bạn là chatbot tư vấn tour du lịch chuyên nghiệp của TourEase.
                    
                    Dữ liệu tour phù hợp:
                    %s
                    
                    Câu hỏi: "%s"
                    
                    Hãy trả lời thân thiện, tự nhiên (1-2 câu) giới thiệu các tour phù hợp.
                    KHÔNG liệt kê chi tiết tour vì hệ thống sẽ hiển thị card tour.
                    
                    Ví dụ trả lời hay:
                    - "Mình tìm được %d tour phù hợp với yêu cầu của bạn đây:"
                    - "Dưới đây là những tour %s tuyệt vời cho bạn:"
                    - "Bạn có thể tham khảo %d tour sau nhé:"
                    """, context, message, filteredTours.size(), 
                    intent.getDestination() != null ? intent.getDestination() : "",
                    filteredTours.size());
                
                String aiResponse = geminiService.callGemini(prompt);
                
                response.put("message", aiResponse);
                response.put("tours", convertToursToMap(filteredTours));
                
            } else {
                String prompt = String.format("""
                    Bạn là chatbot tư vấn du lịch.
                    Khách hỏi: "%s"
                    
                    Hiện tại không có tour phù hợp với yêu cầu này.
                    
                    Hãy:
                    1. Xin lỗi thân thiện
                    2. Đề xuất họ thử tìm tour khác (Đà Nẵng, Nha Trang, Phú Quốc, Sapa, Đà Lạt...)
                    3. Hoặc thay đổi điều kiện (giá, thời gian)
                    
                    Trả lời ngắn gọn 2-3 câu.
                    """, message);
                
                String aiResponse = geminiService.callGemini(prompt);
                response.put("message", aiResponse);
            }
            
        } else {
            // ═══════════════════════════════════════════════════════
            // LOẠI 3: CÂU HỎI KHÁC (chào hỏi, hỏi thông tin chung...)
            // ═══════════════════════════════════════════════════════
            String prompt = String.format("""
                Bạn là chatbot tư vấn du lịch thân thiện của TourEase.
                Câu hỏi: "%s"
                
                Hãy trả lời ngắn gọn, hữu ích và tự nhiên.
                Nếu có thể, gợi ý khách hỏi về các tour du lịch hoặc thông tin địa điểm.
                """, message);
            
            String aiResponse = geminiService.callGemini(prompt);
            response.put("message", aiResponse);
        }
        
        return response;
    }
    
    /**
     * Phân loại câu hỏi của user
     */
    private QuestionType classifyQuestion(String message) {
        String msg = message.toLowerCase();
        
        // Từ khóa chỉ muốn TÌM/ĐẶT TOUR
        String[] tourSearchKeywords = {
            "tour", "đặt tour", "dat tour", "book tour", "tìm tour", "tim tour",
            "gợi ý tour", "goi y tour", "tour nào", "có tour", "co tour",
            "giá tour", "gia tour", "tour giá", "tour gia",
            "dưới", "duoi", "từ", "tu", "khoảng", "khoang",
            "rẻ nhất", "re nhat", "rẻ", "tiết kiệm"
        };
        
        // Từ khóa hỏi THÔNG TIN ĐỊA ĐIỂM
        String[] infoQueryKeywords = {
            "có gì", "co gi", "có những gì", "có địa điểm nào", "co dia diem nao",
            "nên đi", "nen di", "đi đâu", "di dau", "chơi gì", "choi gi",
            "ăn gì", "an gi", "đẹp không", "dep khong", "có đẹp", "co dep",
            "thế nào", "the nao", "như thế nào", "nhu the nao",
            "vào mùa", "vao mua", "tháng mấy", "thang may",
            "nổi tiếng", "noi tieng", "đặc sản", "dac san",
            "kinh nghiệm", "kinh nghiem", "review", "đánh giá"
        };
        
        // Kiểm tra tour search
        for (String keyword : tourSearchKeywords) {
            if (msg.contains(keyword)) {
                return QuestionType.TOUR_SEARCH;
            }
        }
        
        // Kiểm tra info query
        for (String keyword : infoQueryKeywords) {
            if (msg.contains(keyword)) {
                // Nếu có cả từ khóa địa điểm
                if (containsDestination(msg)) {
                    return QuestionType.INFORMATION_QUERY;
                }
            }
        }
        
        // Nếu không rõ ràng, mặc định là OTHER
        return QuestionType.OTHER;
    }
    
    /**
     * Kiểm tra câu có chứa tên địa điểm không
     */
    private boolean containsDestination(String msg) {
        String[] destinations = {
            "đà nẵng", "da nang", "nha trang", "phú quốc", "phu quoc",
            "đà lạt", "da lat", "sapa", "hà nội", "ha noi", "hạ long",
            "hội an", "hoi an", "huế", "hue", "mũi né", "mui ne",
            "vũng tàu", "vung tau", "cần thơ", "can tho", "hà giang",
            "ninh bình", "ninh binh", "mộc châu", "moc chau", "điện biên"
        };
        
        for (String dest : destinations) {
            if (msg.contains(dest)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Enum phân loại câu hỏi
     */
    private enum QuestionType {
        TOUR_SEARCH,        
        INFORMATION_QUERY,  
        OTHER              
    }
    
    /**
     * Phân tích ý định của user từ câu hỏi
     */
    private QueryIntent analyzeQueryIntent(String message) {
        QueryIntent intent = new QueryIntent();
        String msg = message.toLowerCase();
        
        // 1. PHÂN TÍCH GIÁ
        intent.setMaxPrice(extractMaxPrice(msg));
        intent.setMinPrice(extractMinPrice(msg));
        intent.setPriceBudget(extractPriceBudget(msg));
        
        // 2. PHÂN TÍCH THỜI GIAN
        intent.setDuration(extractDuration(msg));
        
        // 3. PHÂN TÍCH ĐỊA ĐIỂM
        intent.setDestination(extractDestination(msg));
        
        // 4. PHÂN TÍCH LOẠI TOUR
        intent.setTourType(extractTourType(msg));
        
        // 5. PHÂN TÍCH MÙA/THỜI TIẾT
        intent.setSeason(extractSeason(msg));
        
        // 6. PHÂN TÍCH SỐ NGƯỜI
        intent.setGroupSize(extractGroupSize(msg));
        
        // 7. PHÂN TÍCH PHƯƠNG TIỆN
        intent.setTransportation(extractTransportation(msg));
        
        return intent;
    }
    
    /**
     * Lọc tours thông minh dựa trên ý định
     */
    private List<Tour> filterToursAdvanced(List<Tour> tours, QueryIntent intent) {
        return tours.stream()
            .filter(tour -> matchesIntent(tour, intent))
            .sorted((t1, t2) -> calculateMatchScore(t2, intent) - calculateMatchScore(t1, intent))
            .limit(5)
            .collect(Collectors.toList());
    }
    
    /**
     * Kiểm tra tour có khớp với ý định không
     */
    private boolean matchesIntent(Tour tour, QueryIntent intent) {
        // Lọc theo giá
        if (intent.getMaxPrice() != null && tour.getPriceAdult() > intent.getMaxPrice()) {
            return false;
        }
        if (intent.getMinPrice() != null && tour.getPriceAdult() < intent.getMinPrice()) {
            return false;
        }
        
        // Lọc theo địa điểm
        if (intent.getDestination() != null) {
            String dest = intent.getDestination().toLowerCase();
            String tourTitle = tour.getTitle().toLowerCase();
            String tourDest = tour.getDestination().toLowerCase();
            
            if (!tourTitle.contains(dest) && !tourDest.contains(dest)) {
                return false;
            }
        }
        
        // Lọc theo thời gian
        if (intent.getDuration() != null) {
            if (!tour.getDuration().contains(intent.getDuration())) {
                return false;
            }
        }
        
        // Lọc theo phương tiện
        if (intent.getTransportation() != null) {
            String transport = intent.getTransportation().toLowerCase();
            String tourTransport = tour.getTransportation() != null ? 
                tour.getTransportation().toLowerCase() : "";
            
            if (!tourTransport.contains(transport)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Tính điểm khớp của tour với ý định (để sắp xếp)
     */
    private int calculateMatchScore(Tour tour, QueryIntent intent) {
        int score = 0;
        
        // Khớp địa điểm: +10 điểm
        if (intent.getDestination() != null) {
            String dest = intent.getDestination().toLowerCase();
            if (tour.getTitle().toLowerCase().contains(dest) || 
                tour.getDestination().toLowerCase().contains(dest)) {
                score += 10;
            }
        }
        
        // Khớp thời gian: +8 điểm
        if (intent.getDuration() != null && 
            tour.getDuration().contains(intent.getDuration())) {
            score += 8;
        }
        
        // Khớp giá budget: +5 điểm
        if (intent.getPriceBudget() != null) {
            if (intent.getPriceBudget().equals("rẻ") && tour.getPriceAdult() < 5_000_000) {
                score += 5;
            } else if (intent.getPriceBudget().equals("cao cấp") && tour.getPriceAdult() > 10_000_000) {
                score += 5;
            }
        }
        
        // Tour còn chỗ: +3 điểm
        if (tour.getAvailability() != null && tour.getAvailability()) {
            score += 3;
        }
        
        return score;
    }
    
    // ═══════════════════════════════════════════════════════
    // CÁC HÀM TRÍCH XUẤT THÔNG TIN TỪ CÂU HỎI
    // ═══════════════════════════════════════════════════════
    
    private Double extractMaxPrice(String msg) {
        // "dưới 5 triệu", "dưới 5tr", "không quá 10 triệu"
        Pattern pattern = Pattern.compile("(dưới|duoi|không quá|khong qua|tối đa|toi da)\\s*(\\d+)\\s*(triệu|triều|trieu|tr|m|million)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(msg);
        
        if (matcher.find()) {
            try {
                int number = Integer.parseInt(matcher.group(2));
                return (double) number * 1_000_000;
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }
    
    private Double extractMinPrice(String msg) {
        // "từ 5 triệu", "trên 5 triệu"
        Pattern pattern = Pattern.compile("(từ|tu|trên|tren|trở lên|tro len)\\s*(\\d+)\\s*(triệu|triều|trieu|tr|m)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(msg);
        
        if (matcher.find()) {
            try {
                int number = Integer.parseInt(matcher.group(2));
                return (double) number * 1_000_000;
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }
    
    private String extractPriceBudget(String msg) {
        if (msg.contains("rẻ") || msg.contains("re") || msg.contains("tiết kiệm") || msg.contains("tiet kiem")) {
            return "rẻ";
        }
        if (msg.contains("cao cấp") || msg.contains("cao cap") || msg.contains("sang trọng") || msg.contains("vip")) {
            return "cao cấp";
        }
        return null;
    }
    
    private String extractDuration(String msg) {
        // "3 ngày", "3N2Đ", "4 ngày 3 đêm"
        Pattern pattern = Pattern.compile("(\\d+)\\s*(ngày|ngay|n)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(msg);
        
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }
    
    private String extractDestination(String msg) {
        Map<String, String[]> destinations = new HashMap<>();
        
        destinations.put("Đà Nẵng", new String[]{"đà nẵng", "da nang", "danang"});
        destinations.put("Nha Trang", new String[]{"nha trang", "nhatrang"});
        destinations.put("Phú Quốc", new String[]{"phú quốc", "phu quoc", "phuquoc"});
        destinations.put("Đà Lạt", new String[]{"đà lạt", "da lat", "dalat"});
        destinations.put("Sapa", new String[]{"sapa", "sa pa", "lào cai", "lao cai"});
        destinations.put("Hà Nội", new String[]{"hà nội", "ha noi", "hanoi"});
        destinations.put("Hạ Long", new String[]{"hạ long", "ha long", "halong", "vịnh hạ long"});
        destinations.put("Hội An", new String[]{"hội an", "hoi an", "hoian"});
        destinations.put("Huế", new String[]{"huế", "hue"});
        destinations.put("Mũi Né", new String[]{"mũi né", "mui ne", "muine", "phan thiết", "phan thiet"});
        destinations.put("Vũng Tàu", new String[]{"vũng tàu", "vung tau", "vungtau"});
        destinations.put("Cần Thơ", new String[]{"cần thơ", "can tho", "cantho", "miền tây", "mien tay"});
        destinations.put("Hà Giang", new String[]{"hà giang", "ha giang", "hagiang"});
        destinations.put("Ninh Bình", new String[]{"ninh bình", "ninh binh", "ninhbinh", "tràng an", "trang an"});
        destinations.put("Mộc Châu", new String[]{"mộc châu", "moc chau", "mocchau"});
        destinations.put("Điện Biên", new String[]{"điện biên", "dien bien", "dienbien"});
        
        for (Map.Entry<String, String[]> entry : destinations.entrySet()) {
            for (String keyword : entry.getValue()) {
                if (msg.contains(keyword)) {
                    return entry.getKey();
                }
            }
        }
        
        return null;
    }
    
    private String extractTourType(String msg) {
        if (msg.contains("biển") || msg.contains("bien") || msg.contains("tắm biển") || msg.contains("bãi biển")) {
            return "biển";
        }
        if (msg.contains("núi") || msg.contains("nui") || msg.contains("leo núi") || msg.contains("trekking")) {
            return "núi";
        }
        if (msg.contains("miền tây") || msg.contains("mien tay") || msg.contains("đồng bằng") || msg.contains("sông nước")) {
            return "miền tây";
        }
        if (msg.contains("tâm linh") || msg.contains("tam linh") || msg.contains("chùa") || msg.contains("chua")) {
            return "tâm linh";
        }
        if (msg.contains("gia đình") || msg.contains("gia dinh") || msg.contains("trẻ em") || msg.contains("tre em")) {
            return "gia đình";
        }
        return null;
    }
    
    private String extractSeason(String msg) {
        if (msg.contains("mùa hè") || msg.contains("mua he") || msg.contains("hè") || msg.contains("he")) {
            return "hè";
        }
        if (msg.contains("mùa đông") || msg.contains("mua dong") || msg.contains("đông") || msg.contains("dong")) {
            return "đông";
        }
        if (msg.contains("tết") || msg.contains("tet") || msg.contains("xuân") || msg.contains("xuan")) {
            return "tết";
        }
        return null;
    }
    
    private String extractGroupSize(String msg) {
        if (msg.contains("một mình") || msg.contains("solo") || msg.contains("cá nhân")) {
            return "solo";
        }
        if (msg.contains("cặp đôi") || msg.contains("cap doi") || msg.contains("2 người")) {
            return "couple";
        }
        if (msg.contains("gia đình") || msg.contains("gia dinh")) {
            return "family";
        }
        if (msg.contains("nhóm") || msg.contains("nhom") || msg.contains("bạn bè")) {
            return "group";
        }
        return null;
    }
    
    private String extractTransportation(String msg) {
        if (msg.contains("máy bay") || msg.contains("may bay") || msg.contains("bay")) {
            return "Máy bay";
        }
        if (msg.contains("xe") || msg.contains("ô tô") || msg.contains("o to") || msg.contains("bus")) {
            return "Xe";
        }
        return null;
    }
    
    // ═══════════════════════════════════════════════════════
    // CÁC HÀM HỖ TRỢ
    // ═══════════════════════════════════════════════════════
    
    private boolean isTourRelated(String message) {
        String msg = message.toLowerCase();
        
        String[] keywords = {
            "tour", "giá", "đi", "ngày", "đêm", "địa điểm", "đặt", "booking",
            "du lịch", "đà nẵng", "nha trang", "phú quốc", "hà nội", "sapa",
            "đà lạt", "hạ long", "hội an", "huế", "vũng tàu", "cần thơ",
            "miền bắc", "miền nam", "miền trung", "miền tây", "biển", "núi",
            "nghỉ dưỡng", "kỳ nghỉ", "vacation", "travel", "trip", "gợi ý",
            "tư vấn", "giới thiệu", "có gì", "mấy ngày", "bao nhiêu"
        };
        
        for (String keyword : keywords) {
            if (msg.contains(keyword)) {
                return true;
            }
        }
        
        return false;
    }
    
    private String buildDetailedTourContext(List<Tour> tours, QueryIntent intent) {
        StringBuilder sb = new StringBuilder();
        
        for (Tour tour : tours) {
            sb.append("- ").append(tour.getTitle())
              .append(", Điểm đến: ").append(tour.getDestination())
              .append(", Giá: ").append(String.format("%,.0f", tour.getPriceAdult())).append(" VNĐ")
              .append(", Thời gian: ").append(tour.getDuration());
            
            if (tour.getTransportation() != null) {
                sb.append(", Phương tiện: ").append(tour.getTransportation());
            }
            
            sb.append("\n");
        }
        
        return sb.toString();
    }
    
    private List<Map<String, Object>> convertToursToMap(List<Tour> tours) {
        return tours.stream().map(tour -> {
            Map<String, Object> tourMap = new HashMap<>();
            tourMap.put("tourID", tour.getTourID());
            tourMap.put("title", tour.getTitle());
            tourMap.put("destination", tour.getDestination());
            tourMap.put("duration", tour.getDuration());
            tourMap.put("priceAdult", tour.getPriceAdult());
            tourMap.put("priceChild", tour.getPriceChild());
            tourMap.put("tourCode", tour.getTourCode());
            tourMap.put("departureLocation", tour.getDepartureLocation());
            tourMap.put("transportation", tour.getTransportation());
            tourMap.put("availability", tour.getAvailability());
            tourMap.put("quantity", tour.getQuantity());
            
            String imageUrl = null;
            if (tour.getImages() != null && !tour.getImages().isEmpty()) {
                imageUrl = tour.getImages().get(0);
            }
            tourMap.put("image", imageUrl);
            
            return tourMap;
        }).collect(Collectors.toList());
    }
    
    /**
     * Class lưu ý định của user
     */
    private static class QueryIntent {
        private Double maxPrice;
        private Double minPrice;
        private String priceBudget;
        private String duration;
        private String destination;
        private String tourType;
        private String season;
        private String groupSize;
        private String transportation;
        
        // Getters and Setters
        public Double getMaxPrice() { return maxPrice; }
        public void setMaxPrice(Double maxPrice) { this.maxPrice = maxPrice; }
        
        public Double getMinPrice() { return minPrice; }
        public void setMinPrice(Double minPrice) { this.minPrice = minPrice; }
        
        public String getPriceBudget() { return priceBudget; }
        public void setPriceBudget(String priceBudget) { this.priceBudget = priceBudget; }
        
        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }
        
        public String getDestination() { return destination; }
        public void setDestination(String destination) { this.destination = destination; }
        
        public String getTourType() { return tourType; }
        public void setTourType(String tourType) { this.tourType = tourType; }
        
        public String getSeason() { return season; }
        public void setSeason(String season) { this.season = season; }
        
        public String getGroupSize() { return groupSize; }
        public void setGroupSize(String groupSize) { this.groupSize = groupSize; }
        
        public String getTransportation() { return transportation; }
        public void setTransportation(String transportation) { this.transportation = transportation; }
    }
}
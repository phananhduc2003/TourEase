import { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  TextField,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { ApiChatBot } from "../../api/user/ApiChatBot";
import { ApiGetChatHistory } from "../../api/user/ApiGetChatHistory";
import { ApiSaveChatMessage } from "../../api/user/ApiSaveChatMessage";
import { ApiClearChatHistory } from "../../api/user/ApiClearChatHistory";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ChatBox({ onClose }) {
  const GUEST_STORAGE_KEY = "chatbot_guest_history";
  const navigate = useNavigate();

  const authContext = useAuth();
  const userId = authContext.idUser;

  const getInitialMessages = () => {
    const defaultMsg = [
      {
        sender: "bot",
        text: "Xin chào 👋 Tôi có thể giúp gì cho bạn?",
        type: "text",
      },
    ];

    if (!userId) {
      const saved = localStorage.getItem(GUEST_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultMsg;
        }
      }
      return defaultMsg;
    }

    return defaultMsg;
  };

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(getInitialMessages);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Gợi ý câu hỏi nhanh
  const quickQuestions = [
    "Tour Đà Nẵng có gì hay?",
    "Tour giá rẻ nhất",
    "Tour 3 ngày 2 đêm",
    "Du lịch miền Bắc",
  ];

  useEffect(() => {
    if (userId) {
      loadChatHistory();
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const loadChatHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await ApiGetChatHistory(userId);

      if (response.data && response.data.length > 0) {
        const formattedMessages = response.data.map((msg) => ({
          sender: msg.sender,
          text: msg.message,
          type: msg.type || "text",
          tours: msg.tours ? JSON.parse(msg.tours) : null,
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const saveChatToBackend = async (
    userMsg,
    botMsg,
    botType = "text",
    tours = null
  ) => {
    if (!userId) return;

    try {
      await ApiSaveChatMessage({
        userID: userId,
        userMessage: userMsg,
        botMessage: botMsg,
        botType: botType,
        tours: tours ? JSON.stringify(tours) : null,
      });
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  const handleSend = async (messageText = input) => {
    const userMessage = messageText.trim();
    if (!userMessage || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
        type: "text",
      },
    ]);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await ApiChatBot(userMessage);

      // Giả lập typing delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsTyping(false);

      const botData = response.data;

      // Kiểm tra nếu có tours trong response
      if (
        botData.tours &&
        Array.isArray(botData.tours) &&
        botData.tours.length > 0
      ) {
        const botReply =
          botData.message || "Đây là một số tour phù hợp với bạn:";

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: botReply,
            type: "tours",
            tours: botData.tours,
          },
        ]);

        if (userId) {
          await saveChatToBackend(
            userMessage,
            botReply,
            "tours",
            botData.tours
          );
        }
      } else {
        // Response text thông thường
        const botReply =
          botData.message ||
          botData.reply ||
          "Xin lỗi, tôi không thể trả lời câu hỏi này.";

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: botReply,
            type: "text",
          },
        ]);

        if (userId) {
          await saveChatToBackend(userMessage, botReply, "text");
        }
      }
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      setIsTyping(false);

      const errorMsg = "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: errorMsg,
          type: "text",
        },
      ]);

      if (userId) {
        await saveChatToBackend(userMessage, errorMsg, "text");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearChatHistory = async () => {
    const defaultMsg = [
      {
        sender: "bot",
        text: "Xin chào 👋 Tôi có thể giúp gì cho bạn?",
        type: "text",
      },
    ];

    if (!userId) {
      localStorage.removeItem(GUEST_STORAGE_KEY);
      setMessages(defaultMsg);
    } else {
      try {
        await ApiClearChatHistory(userId);
        setMessages(defaultMsg);
      } catch (error) {
        console.error("Error clearing history:", error);
      }
    }
  };

  const handleQuickQuestion = (question) => {
    handleSend(question);
  };

  const handleViewTour = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  const handleBookTour = (tourId) => {
    navigate(`/booking/${tourId}`);
  };

  // Render tin nhắn text thông thường
  const renderTextMessage = (msg) => (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderRadius: 2,
        bgcolor: msg.sender === "user" ? "primary.main" : "white",
        color: msg.sender === "user" ? "white" : "black",
        maxWidth: "70%",
        width: "fit-content",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
        boxShadow: 1,
      }}
    >
      <Typography variant="body2">{msg.text}</Typography>
    </Box>
  );

  // Render tour cards
  const renderTourCards = (msg) => (
    <Box sx={{ maxWidth: "90%", width: "fit-content" }}>
      {/* Text trước cards */}
      <Box
        sx={{
          px: 2,
          py: 1,
          mb: 1,
          borderRadius: 2,
          bgcolor: "white",
          color: "text.primary",
          boxShadow: 1,
        }}
      >
        <Typography variant="body2">{msg.text}</Typography>
      </Box>

      {/* Tour cards */}
      {msg.tours?.map((tour, idx) => (
        <Card
          key={idx}
          sx={{
            mb: 1.5,
            boxShadow: 2,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 3,
            },
          }}
        >
          {tour.image && (
            <CardMedia
              component="img"
              height="120"
              image={tour.image}
              alt={tour.title}
              sx={{ objectFit: "cover" }}
            />
          )}
          <CardContent sx={{ p: 1.5 }}>
            {/* Title + Tour Code */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                mb: 1,
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {tour.title}
              </Typography>
              {tour.tourCode && (
                <Chip
                  label={tour.tourCode}
                  size="small"
                  sx={{ ml: 1, fontSize: "0.7rem", height: 20 }}
                />
              )}
            </Box>

            {/* Destination */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <LocationOnIcon
                sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
              />
              <Typography variant="caption" color="text.secondary">
                {tour.destination}
              </Typography>
            </Box>

            {/* Duration */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <AccessTimeIcon
                sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
              />
              <Typography variant="caption" color="text.secondary">
                {tour.duration}
              </Typography>
            </Box>

            {/* Transportation */}
            {tour.transportation && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <DirectionsBusIcon
                  sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
                />
                <Typography variant="caption" color="text.secondary">
                  {tour.transportation}
                </Typography>
              </Box>
            )}

            {/* Availability */}
            {tour.availability !== undefined && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <EventAvailableIcon
                  sx={{
                    fontSize: 14,
                    mr: 0.5,
                    color: tour.availability ? "success.main" : "error.main",
                  }}
                />
                <Typography
                  variant="caption"
                  color={tour.availability ? "success.main" : "error.main"}
                  fontWeight="500"
                >
                  {tour.availability
                    ? `Còn ${tour.quantity || 0} chỗ`
                    : "Hết chỗ"}
                </Typography>
              </Box>
            )}

            {/* Price */}
            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AttachMoneyIcon
                  sx={{ fontSize: 14, mr: 0.5, color: "error.main" }}
                />
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="error.main"
                >
                  {tour.priceAdult?.toLocaleString("vi-VN")} đ
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 0.5 }}
                >
                  /người lớn
                </Typography>
              </Box>
              {tour.priceChild && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 2.5 }}
                >
                  Trẻ em: {tour.priceChild?.toLocaleString("vi-VN")} đ
                </Typography>
              )}
            </Box>

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                fullWidth
                onClick={() => handleViewTour(tour.tourID)}
              >
                Xem chi tiết
              </Button>
              <Button
                size="small"
                variant="contained"
                fullWidth
                onClick={() => handleBookTour(tour.tourID)}
                disabled={!tour.availability}
              >
                {tour.availability ? "Đặt ngay" : "Hết chỗ"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <Paper
      elevation={4}
      sx={{
        width: 360,
        height: 500,
        position: "fixed",
        bottom: 24,
        right: 24,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 1.5,
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SmartToyIcon sx={{ mr: 1 }} />
          <Typography fontWeight="bold">
            {userId ? `Hi, bạn` : "Hỗ trợ"}
          </Typography>
        </Box>

        <Box>
          <IconButton
            size="small"
            onClick={clearChatHistory}
            sx={{ color: "white", mr: 0.5 }}
            title="Xóa lịch sử chat"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          bgcolor: "background.paper",
        }}
      >
        {loadingHistory ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1.5,
                  minWidth: 0,
                }}
              >
                {msg.type === "tours"
                  ? renderTourCards(msg)
                  : renderTextMessage(msg)}
              </Box>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    display: "flex",
                    gap: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "grey.500",
                      animation: "bounce 1.4s infinite ease-in-out both",
                      animationDelay: "-0.32s",
                      "@keyframes bounce": {
                        "0%, 80%, 100%": { transform: "scale(0)" },
                        "40%": { transform: "scale(1)" },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "grey.500",
                      animation: "bounce 1.4s infinite ease-in-out both",
                      animationDelay: "-0.16s",
                    }}
                  />
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "grey.500",
                      animation: "bounce 1.4s infinite ease-in-out both",
                    }}
                  />
                </Box>
              </Box>
            )}

            {/* Quick questions */}
            {messages.length === 1 && !loading && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1, display: "block" }}
                >
                  Gợi ý câu hỏi:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {quickQuestions.map((q, idx) => (
                    <Chip
                      key={idx}
                      label={q}
                      size="small"
                      onClick={() => handleQuickQuestion(q)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "primary.light",
                          color: "white",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      {/* Input */}
      <Box sx={{ p: 1, display: "flex", gap: 1 }}>
        <TextField
          size="small"
          placeholder="Nhập tin nhắn..."
          fullWidth
          multiline
          maxRows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={loading || loadingHistory}
        />
        <IconButton
          color="primary"
          onClick={() => handleSend()}
          disabled={loading || loadingHistory || !input.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default ChatBox;

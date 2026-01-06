import { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DeleteIcon from "@mui/icons-material/Delete";

import { ApiChatBot } from "../../api/user/ApiChatBot";
import { ApiGetChatHistory } from "../../api/user/ApiGetChatHistory";
import { ApiSaveChatMessage } from "../../api/user/ApiSaveChatMessage";
import { ApiClearChatHistory } from "../../api/user/ApiClearChatHistory";
import { useAuth } from "../../context/AuthContext";

function ChatBox({ onClose }) {
  const GUEST_STORAGE_KEY = "chatbot_guest_history";

  // Lấy thông tin user từ AuthContext
  const authContext = useAuth();
  const userId = authContext.idUser;
  const userName = authContext.userName || "Bạn";

  // Lấy lịch sử ban đầu
  const getInitialMessages = () => {
    const defaultMsg = [
      { sender: "bot", text: "Xin chào 👋 Tôi có thể giúp gì cho bạn?" },
    ];

    if (!userId) {
      // Chưa đăng nhập -> đọc từ localStorage
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

    // Đã đăng nhập -> sẽ load từ API ở useEffect
    return defaultMsg;
  };

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(getInitialMessages);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const messagesEndRef = useRef(null);

  // Load lịch sử từ backend khi đã đăng nhập
  useEffect(() => {
    if (userId) {
      loadChatHistory();
    }
  }, [userId]);

  // Lưu lịch sử cho guest vào localStorage
  useEffect(() => {
    if (!userId) {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, userId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadChatHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await ApiGetChatHistory(userId);

      if (response.data && response.data.length > 0) {
        // Convert từ backend format sang frontend format
        const formattedMessages = response.data.map((msg) => ({
          sender: msg.sender,
          text: msg.message,
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const saveChatToBackend = async (userMsg, botMsg) => {
    if (!userId) return;

    try {
      await ApiSaveChatMessage({
        userID: userId,
        userMessage: userMsg,
        botMessage: botMsg,
      });
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await ApiChatBot(userMessage);

      const botReply =
        response.data?.message ||
        response.data?.reply ||
        "Xin lỗi, tôi không thể trả lời câu hỏi này.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);

      // Lưu vào backend nếu đã đăng nhập
      if (userId) {
        await saveChatToBackend(userMessage, botReply);
      }
    } catch (error) {
      console.error("Error calling chatbot API:", error);

      const errorMsg = "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.";

      setMessages((prev) => [...prev, { sender: "bot", text: errorMsg }]);

      if (userId) {
        await saveChatToBackend(userMessage, errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearChatHistory = async () => {
    const defaultMsg = [
      { sender: "bot", text: "Xin chào 👋 Tôi có thể giúp gì cho bạn?" },
    ];

    if (!userId) {
      // Guest: xóa localStorage
      localStorage.removeItem(GUEST_STORAGE_KEY);
      setMessages(defaultMsg);
    } else {
      // User: gọi API xóa
      try {
        await ApiClearChatHistory(userId);
        setMessages(defaultMsg);
      } catch (error) {
        console.error("Error clearing history:", error);
      }
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: 320,
        height: 420,
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
            {userId ? `Hi, ${userName}` : "Hỗ trợ"}
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
          bgcolor: "#f5f5f5",
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
                  mb: 1,
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: msg.sender === "user" ? "primary.main" : "white",
                    color: msg.sender === "user" ? "white" : "text.primary",
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
              </Box>
            ))}

            {loading && (
              <Box
                sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: "white",
                    boxShadow: 1,
                  }}
                >
                  <CircularProgress size={20} />
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
          onClick={handleSend}
          disabled={loading || loadingHistory || !input.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default ChatBox;

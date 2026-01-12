import { Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
function ChatButton({ onClick }) {
  return (
    <Fab
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        backgroundColor: "primary.main",
        color: "white",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: 4,
          cursor: "pointer",
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
    >
      <ChatIcon />
    </Fab>
  );
}

export default ChatButton;

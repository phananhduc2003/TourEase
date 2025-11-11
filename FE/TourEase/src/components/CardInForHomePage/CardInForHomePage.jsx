import { Box, Typography } from "@mui/material";

function CardInForHomePage({ title, description, icon: Icon }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        minHeight: "180px",
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s ease-in-out", // hiệu ứng mượt
        "&:hover": {
          transform: "scale(1.05)", // phóng to nhẹ khi hover
          boxShadow: 4, // thêm đổ bóng nếu muốn
          cursor: "pointer", // đổi con trỏ chuột
        },
      }}
    >
      {Icon && <Icon sx={{ color: "primary.main", fontSize: "36px" }} />}
      <Typography
        variant="Subtitle2"
        fontWeight={"bold"}
        sx={{ mt: 2, color: "text.primary" }}
      >
        {title}
      </Typography>
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.primary", fontSize: "0.9rem" }}
      >
        {description}
      </Typography>
    </Box>
  );
}

export default CardInForHomePage;

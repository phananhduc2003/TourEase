import { Box, Typography, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ApiGetInforBooking } from "../../../api/user/ApiGetInforBooking";
import { useAuth } from "../../../context/AuthContext";

function InforBooking() {
  const { idUser: userId } = useAuth(); // Cleaner destructuring
  const [data, setData] = useState([]);

  useEffect(() => {
    if (userId) {
      ApiGetInforBooking(userId)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [userId]);

  console.log("data", data);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
      }}
    >
      {data.length === 0 && <Typography>Không có booking nào!</Typography>}

      {data.map((item) => (
        <Box
          key={item.bookingID}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            overflow: "hidden",
            p: 2,
            width: "70%",
            mb: 2,
          }}
        >
          {/* Hình ảnh */}
          <Box
            sx={{
              width: "30%",
              height: "180px",
              backgroundImage: `url(${item.tour.images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
            }}
          ></Box>

          {/* Nội dung */}
          <Box sx={{ width: "70%", pl: 2 }}>
            {/* Địa điểm / Destination */}
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: "bold",
                mb: 1,
                display: "block",
              }}
            >
              {item.tour.destination}
            </Typography>

            {/* Tiêu đề tour */}
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}
            >
              {item.tour.title}
            </Typography>

            {/* Mô tả */}
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
              {item.tour.description}
            </Typography>

            {/* Thông tin booking */}
            <Grid container spacing={1} direction={"column"} sx={{ mb: 1 }}>
              <Grid item>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  🕒 {item.tour.duration}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  👥 {item.numAdults + item.numChildren} người
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  📅 Ngày đặt: {item.bookingDate}
                </Typography>
              </Grid>
            </Grid>

            {/* Giá */}
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {item.totalPrice.toLocaleString()} VND
            </Typography>

            {/* Trạng thái */}
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              {item.bookingStatus === "PENDING"
                ? "Đợi xác nhận"
                : item.bookingStatus}
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default InforBooking;

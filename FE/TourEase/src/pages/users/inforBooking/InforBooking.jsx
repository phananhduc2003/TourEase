import { Box, Typography, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ApiGetInforBooking } from "../../../api/user/ApiGetInforBooking";
import { useAuth } from "../../../context/AuthContext";

import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FaceIcon from "@mui/icons-material/Face";
import Face5Icon from "@mui/icons-material/Face5";
import SpeedIcon from "@mui/icons-material/Speed";
import MyLocationIcon from "@mui/icons-material/MyLocation";

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
            p: 1,
            width: "70%",
            mb: 2,
          }}
        >
          {/* Hình ảnh */}
          <Box
            sx={{
              width: "35%",
              minHeight: 250,
              flexShrink: 0,
              backgroundImage: `url(${item.tour.images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
              borderRadius: 1,
            }}
          ></Box>

          {/* Nội dung */}
          <Box sx={{ width: "70%", pl: 2 }}>
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1rem",
                fontWeight: "bold",
                gap: 1,
              }}
            >
              Mã tour:&nbsp;
              <Typography sx={{ fontSize: "1rem" }}>
                {item.tour.tourCode}
              </Typography>
            </Typography>
            {/* Tiêu đề tour */}
            <Typography
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                fontSize: "1.3rem",
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              {item.tour.title}
            </Typography>

            {/* Thông tin booking */}
            <Grid container spacing={1} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem",
                    gap: 1,
                  }}
                >
                  <WatchLaterIcon sx={{ fontSize: "1.2rem" }} />
                  Ngày đặt:&nbsp;
                  <Typography sx={{ fontWeight: 500 }}>
                    {item.bookingDate}
                  </Typography>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem",
                    gap: 1,
                  }}
                >
                  <CalendarMonthIcon sx={{ fontSize: "1.2rem" }} />
                  Ngày khởi hành:&nbsp;
                  <Typography sx={{ fontWeight: 500 }}>
                    {item.startDates}
                  </Typography>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem",

                    gap: 1,
                  }}
                >
                  <SpeedIcon sx={{ fontSize: "1.2rem" }} />
                  Thời gian:&nbsp;
                  <Typography sx={{ fontWeight: 500 }}>
                    {item.tour.duration}
                  </Typography>
                </Typography>
              </Grid>

              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.9rem",
                  ml: 1,
                  mt: 1,
                  gap: 1,
                }}
              >
                <MyLocationIcon sx={{ mr: 0.5, fontSize: "1.2rem" }} />
                Địa điểm khởi hành:&nbsp;
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {item.departureLocation}
                </Typography>
              </Typography>

              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem",

                    gap: 1,
                  }}
                >
                  <FaceIcon sx={{ fontSize: "1.2rem" }} />
                  Người lớn:&nbsp;
                  <Typography sx={{ fontWeight: 500 }}>
                    {item.numAdults}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem",
                    gap: 1,
                  }}
                >
                  <Face5Icon sx={{ fontSize: "1.2rem" }} />
                  Trẻ em:&nbsp;
                  <Typography sx={{ fontWeight: 500 }}>
                    {item.numChildren}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>

            {/* Giá */}
            <Typography
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                fontSize: "1.3rem",
              }}
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

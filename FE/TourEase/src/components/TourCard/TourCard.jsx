import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { ApiLatestTour } from "../../api/user/ApiLatestTour";
import { useEffect, useState } from "react";

function TourCard({ onclickChangePage }) {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    CardInfor();
  }, []);

  const CardInfor = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiLatestTour();

      if (response && response.data) {
        // Xử lý cả trường hợp data là array hoặc object
        const toursData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setData(toursData);
      } else {
        setData([]);
      }
    } catch (error) {
      setError(error.message || "Không thể tải dữ liệu");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <CircularProgress size={40} />
        <Typography sx={{ ml: 2 }}>Đang tải tours...</Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ m: 2 }}
        action={
          <Button color="inherit" size="small" onClick={CardInfor}>
            Thử lại
          </Button>
        }
      >
        Lỗi tải dữ liệu: {error}
      </Alert>
    );
  }

  // Empty state
  if (!datas || datas.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Không có tour nào để hiển thị
        </Typography>
        <Button variant="outlined" onClick={CardInfor} sx={{ mt: 2 }}>
          Tải lại
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2} sx={{ justifyContent: "center", px: 2 }}>
        {datas.map((tour, index) => (
          <Grid item xs={12} sm={6} md={3} key={tour.id || `tour-${index}`}>
            <Box
              onClick={() => onclickChangePage(tour.tourID)}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 1,
                p: 1,
                boxShadow: 3,
                height: "100%",
                width: "100%",
                backgroundColor: "background.paper",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              {/* Tour Image */}
              <Box
                sx={{
                  aspectRatio: "4/3",
                  width: "100%",
                  backgroundImage: `url(${
                    tour.images && tour.images.length > 0
                      ? tour.images[0]
                      : "https://via.placeholder.com/400x300/e0e0e0/757575?text=No+Image"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 1,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />

              {/* Tour Info */}
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  mx: 2,
                  flex: 1,
                }}
              >
                {/* Location */}
                <Typography
                  variant="caption"
                  sx={{ mt: 1, color: "text.secondary", fontSize: "0.9rem" }}
                >
                  <LocationOnIcon
                    sx={{
                      verticalAlign: "middle",
                      fontSize: "small",
                      mr: 0.5,
                    }}
                  />
                  {tour.destination || "Chưa cập nhật"}
                </Typography>

                {/* Title */}
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    mt: 1,
                    // Giới hạn 2 dòng
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3em",
                  }}
                >
                  {tour.title || "Tên tour chưa cập nhật"}
                </Typography>

                {/* Duration */}
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary", fontSize: "1rem" }}
                >
                  🕒 {tour.duration || "🕒 Thời gian chưa cập nhật"}
                </Typography>
              </Box>

              <Divider sx={{ mt: 2 }} />

              {/* Price and Button */}
              <Box sx={{ display: "flex", mx: 2, mt: 2, mb: 1 }}>
                <Grid container sx={{ width: "100%" }} alignItems="center">
                  <Grid item xs={6}>
                    <Typography variant="h6" fontWeight="bold">
                      {tour.priceAdult
                        ? Number(tour.priceAdult).toLocaleString("vi-VN")
                        : "Liên hệ"}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.6rem" }}
                      >
                        VND
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/tours/${tour.id || 1}`}
                      size="small"
                      sx={{
                        minWidth: "100px",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Đặt Ngay
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TourCard;

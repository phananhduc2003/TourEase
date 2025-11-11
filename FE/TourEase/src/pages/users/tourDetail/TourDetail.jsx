import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ApiDetailTour } from "../../../api/user/ApiDetailTour";

function TourDetail() {
  const navigate = useNavigate();

  const { tourId } = useParams();
  const [tourDetail, setTourDetail] = useState([]);

  useEffect(() => {
    if (tourId) {
      retrieveTour();
    }
  }, [tourId]);

  const retrieveTour = () => {
    ApiDetailTour(tourId)
      .then((response) => {
        setTourDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tour details:", error);
      });
  };

  // Format giá tiền
  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN");
  };

  // Kiểm tra nếu chưa có dữ liệu
  if (!tourDetail) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Typography>Đang tải thông tin tour...</Typography>
      </Box>
    );
  }

  const handleOrderDetailTour = () => {
    navigate(`/order-detail-tour/${tourId}`);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Box sx={{ width: "80%", display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" fontWeight={"bold"} sx={{ mt: 5 }}>
          {tourDetail.title}
        </Typography>
        <Box>
          <Grid container spacing={0.5} sx={{ mt: 2 }}>
            {/* Ảnh lớn bên trái */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={
                  tourDetail.images && tourDetail.images[0]
                    ? tourDetail.images[0]
                    : "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt="Ảnh chính tour"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  boxShadow: 2,
                }}
              />
            </Grid>

            {/* Ảnh nhỏ bên phải */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={0.5}>
                {[1, 2, 3, 4].map((index) => (
                  <Grid item xs={6} md={6} key={index}>
                    <Box
                      component="img"
                      src={
                        tourDetail.images && tourDetail.images[index]
                          ? tourDetail.images[index]
                          : "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={`Ảnh tour ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        boxShadow: 2,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={8}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  sx={{ color: "primary.main", fontSize: "1.8rem", mb: 2 }}
                >
                  <FolderSpecialIcon
                    sx={{ verticalAlign: "middle", fontSize: "2rem", mr: 1 }}
                  />
                  Tổng Quan
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  sx={{
                    textTransform: "uppercase", // viết hoa toàn bộ
                    fontStyle: "italic",
                    fontSize: "1.2rem",
                    mb: 3,
                  }}
                >
                  giá tour chỉ áp dụng cho khách quốc tịch việt nam
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    textTransform: "uppercase",
                    mb: 1,
                    color: "primary.main",
                  }}
                >
                  Ưu đãi
                </Typography>
                <List sx={{ pl: 2, mb: 0 }}>
                  <ListItem sx={{ display: "list-item", p: 0 }}>
                    <ListItemText
                      primary={
                        <Typography component="span" fontWeight="bold">
                          - Tặng mỗi khách 01 vé foot massage.
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ display: "list-item", p: 0 }}>
                    <ListItemText
                      primary={
                        <Typography component="span">
                          - Giảm 500.000 VND/Khách nếu đăng ký theo nhóm từ 4
                          người lớn.
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
                <Typography
                  sx={{ fontStyle: "italic", fontSize: "0.9rem", mb: 5 }}
                >
                  Số lượng quà tặng có giới hạn và các khuyến mãi có điều kiện
                  áp dụng.
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  sx={{ color: "primary.main", fontSize: "1.8rem", mb: 2 }}
                >
                  <DeveloperBoardIcon
                    sx={{ verticalAlign: "middle", fontSize: "2rem", mr: 1 }}
                  />
                  Lịch Trình
                </Typography>

                {tourDetail.itineraryDays &&
                tourDetail.itineraryDays.length > 0 ? (
                  tourDetail.itineraryDays.map((day) => (
                    <Box
                      key={day.id}
                      sx={{
                        width: "100%",
                        border: "1px solid #ccc",
                        p: 3,
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <ArrowCircleRightIcon sx={{ color: "primary.main" }} />{" "}
                        <Typography
                          fontWeight={"bold"}
                          sx={{
                            ml: 2,
                            fontSize: "1rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {day.title}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box>Không có lịch trình</Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "background.paper",
                  boxShadow: 1,
                }}
              >
                <Typography
                  fontWeight={"bold"}
                  sx={{ mt: 3, ml: 3, fontSize: "1.2rem" }}
                >
                  Thông Tin Cơ Bản
                </Typography>
                <Typography sx={{ mt: 1, ml: 4, fontSize: "1rem" }}>
                  - Giờ Khởi Hành: 8:00
                </Typography>
                <Typography sx={{ mt: 1, ml: 4, fontSize: "1rem" }}>
                  - {tourDetail.duration}
                </Typography>
                <Typography
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    my: 3,
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {formatPrice(tourDetail.priceAdult)}
                  <span style={{ fontSize: "0.8rem", marginLeft: "4px" }}>
                    VND
                  </span>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    onClick={handleOrderDetailTour}
                    sx={{
                      width: "80%",
                      backgroundColor: "primary.main",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      py: 2,
                      mb: 3,
                    }}
                  >
                    Đặt Ngay
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default TourDetail;

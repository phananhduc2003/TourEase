import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiDetailTour } from "../../../api/user/ApiDetailTour";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

function TourDetail() {
  const navigate = useNavigate();

  const { tourId } = useParams();
  const [tourDetail, setTourDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [Active, setActive] = useState(false);

  useEffect(() => {
    if (tourId) {
      retrieveTour();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId]);

  const retrieveTour = async () => {
    try {
      setLoading(true);
      setError(null);

      const startTime = Date.now();
      const response = await ApiDetailTour(tourId);

      setTourDetail(response.data);

      const elapsed = Date.now() - startTime;
      const remaining = 500 - elapsed;

      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setError(error.message || "Không thể tải dữ liệu tour");
      console.error("Error fetching tour details:", error);
      setLoading(false);
    }
  };

  const handleChooseDate = (date) => {
    setActive(true);
    setSelectedDate(date);
  };

  const handleChaneDate = () => {
    setSelectedDate(null);
    setActive(false);
  };

  // Format giá tiền
  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN");
  };

  const handleOrderDetailTour = () => {
    navigate(`/order-detail-tour/${tourId}`, { state: { selectedDate } });
    window.scrollTo(0, 0);
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography color="error" variant="h6" sx={{ mb: 2 }}>
          {error}
        </Typography>
        <Box
          onClick={retrieveTour}
          sx={{
            px: 4,
            py: 1.5,
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: 1,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Thử lại
        </Box>
      </Box>
    );
  }

  if (!tourDetail) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography variant="h6">Không tìm thấy thông tin tour</Typography>
      </Box>
    );
  }

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
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${
                    tourDetail.images && tourDetail.images[0]
                      ? tourDetail.images[0]
                      : "https://via.placeholder.com/600x400?text=No+Image"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: 2,
                  borderRadius: 1,
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
                  sx={{ fontSize: "1.8rem", mb: 2 }}
                >
                  <FolderSpecialIcon
                    sx={{
                      verticalAlign: "middle",
                      fontSize: "2rem",
                      mr: 1,
                      color: "primary.main",
                    }}
                  />
                  Tổng Quan
                </Typography>
                <Typography
                  sx={{
                    lineHeight: "1.4",

                    fontSize: "1.1rem",
                    mb: 3,
                  }}
                >
                  {tourDetail.description}
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
                  sx={{ fontSize: "1.8rem", mb: 2 }}
                >
                  <CalendarMonthIcon
                    sx={{
                      verticalAlign: "middle",
                      fontSize: "2rem",
                      mr: 1,
                      color: "primary.main",
                    }}
                  />
                  Lịch Khởi Hành
                </Typography>

                <Grid container spacing={5} sx={{ mb: 4 }}>
                  {tourDetail.startDates && tourDetail.startDates.length > 0 ? (
                    tourDetail.startDates.map((item, index) => (
                      <Grid item xs={12} sm={4} md={4} key={index}>
                        <Box
                          onClick={() => {
                            if (!Active) {
                              handleChooseDate(item.startDate);
                            }
                          }}
                          sx={{
                            height: "50px",
                            border: "1px solid",
                            borderColor:
                              selectedDate === item.startDate
                                ? "primary.main"
                                : "background.second",
                            borderRadius: 2,
                            p: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                            fontSize: "1rem",

                            cursor:
                              Active && selectedDate !== item.startDate
                                ? "not-allowed"
                                : "pointer",

                            pointerEvents:
                              Active && selectedDate !== item.startDate
                                ? "none"
                                : "auto",

                            opacity:
                              Active && selectedDate !== item.startDate
                                ? 0.4
                                : 1,

                            transform:
                              selectedDate === item.startDate
                                ? "scale(1.03)"
                                : "scale(1)",

                            color:
                              selectedDate === item.startDate
                                ? "primary.main"
                                : "text.primary",

                            "&:hover": {
                              transform:
                                Active && selectedDate !== item.startDate
                                  ? "scale(1)"
                                  : "scale(1.03)",
                              color:
                                Active && selectedDate !== item.startDate
                                  ? "text.primary"
                                  : "primary.main",
                            },
                          }}
                        >
                          {item.startDate}
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          textAlign: "center",
                          color: "text.secondary",
                          py: 2,
                        }}
                      >
                        Không có ngày khởi hành
                      </Box>
                    </Grid>
                  )}
                </Grid>

                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  sx={{ fontSize: "1.8rem", mb: 2 }}
                >
                  <DeveloperBoardIcon
                    sx={{
                      verticalAlign: "middle",
                      fontSize: "2rem",
                      mr: 1,
                      color: "primary.main",
                    }}
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
              <Box sx={{ position: "sticky", top: "100px", mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "background.paper",
                    boxShadow: 2,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    fontWeight={"bold"}
                    sx={{ mt: 3, ml: 3, fontSize: "rem" }}
                  >
                    Thông Tin Cơ Bản
                  </Typography>

                  {Active == false ? (
                    <>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.9rem",
                          ml: 3,
                          mt: 1,
                          gap: 1,
                        }}
                      >
                        <QrCode2Icon sx={{ mr: 0.5, fontSize: "1.2rem" }} />
                        Mã tour:&nbsp;
                        <Typography sx={{ fontWeight: 500 }}>
                          {tourDetail.tourCode}
                        </Typography>
                      </Typography>

                      <Typography
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          my: 2,
                          fontSize: "2rem",
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
                          // onClick={handleOrderDetailTour}
                          sx={{
                            width: "80%",
                            backgroundColor: "primary.main",
                            textAlign: "center",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            borderRadius: 2,
                            py: 2,
                            mb: 3,
                            fontWeight: "bold",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.03)", // hiệu ứng khi hover
                            },
                          }}
                        >
                          Chọn ngày khởi hành
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.9rem",
                          ml: 3,
                          mt: 1,
                          gap: 1,
                        }}
                      >
                        <QrCode2Icon sx={{ mr: 0.5, fontSize: "1.2rem" }} />
                        Mã tour:&nbsp;
                        <Typography sx={{ fontWeight: 500 }}>
                          {tourDetail.tourCode}
                        </Typography>
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.9rem",
                          ml: 3,
                          mt: 1,
                          gap: 1,
                        }}
                      >
                        <MyLocationIcon sx={{ mr: 0.5, fontSize: "1.2rem" }} />
                        Khởi hành:&nbsp;
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontWeight: 500,
                          }}
                        >
                          {tourDetail.departureLocation}
                        </Typography>
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "1rem",
                          ml: 3,
                          mt: 1,
                          gap: 1,
                        }}
                      >
                        <AccessTimeIcon sx={{ mr: 0.5, fontSize: "1.2rem" }} />
                        Thời gian:&nbsp;
                        <Typography sx={{ fontWeight: 500 }}>
                          {tourDetail.duration}
                        </Typography>
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "1rem",
                          ml: 3,
                          mt: 1,
                          gap: 1,
                        }}
                      >
                        <FlightTakeoffIcon
                          sx={{ mr: 0.5, fontSize: "1.2rem" }}
                        />
                        Phương tiện:&nbsp;
                        <Typography sx={{ fontWeight: 500 }}>
                          {tourDetail.transportation}
                        </Typography>
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "1rem",
                          ml: 3,
                          mt: 1,
                          gap: 1,
                        }}
                      >
                        <CalendarMonthIcon
                          sx={{ mr: 0.5, fontSize: "1.2rem" }}
                        />
                        Ngày khởi hành:&nbsp;
                        <Typography sx={{ fontWeight: 500 }}>
                          {selectedDate}
                        </Typography>
                      </Typography>

                      <Typography
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          my: 2,
                          fontSize: "2rem",
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
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          onClick={handleChaneDate}
                          sx={{
                            width: "30%",
                            height: "60px",
                            border: "2px solid ",
                            borderColor: "primary.main",
                            textAlign: "center",
                            fontSize: "1rem",
                            cursor: "pointer",
                            borderRadius: 2,
                            py: 2,
                            mb: 3,
                            fontWeight: "bold",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.03)", // hiệu ứng khi hover
                            },
                          }}
                        >
                          Ngày khác
                        </Box>

                        <Box
                          onClick={handleOrderDetailTour}
                          sx={{
                            width: "60%",
                            height: "60px",
                            backgroundColor: "primary.main",
                            textAlign: "center",
                            fontSize: "1.1rem",
                            cursor: "pointer",
                            borderRadius: 2,
                            py: 2,
                            mb: 3,
                            fontWeight: "bold",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.03)", // hiệu ứng khi hover
                            },
                          }}
                        >
                          Đặt Tour
                        </Box>
                      </Box>
                    </>
                  )}
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

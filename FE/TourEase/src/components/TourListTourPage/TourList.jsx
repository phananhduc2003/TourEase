// src/components/Tour/TourList.jsx
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function TourList({
  tours,
  loading,
  error,
  pagination,
  onRetry,
  onPageChange,
  sortOption,
  onSortChange,
  onTourDetailClick,
}) {
  if (loading) {
    return (
      <Box
        sx={{
          position: "relative",
          minHeight: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Đang tải...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error">Lỗi tải dữ liệu: {error}</Typography>
        <Button onClick={onRetry}>Thử lại</Button>
      </Box>
    );
  }

  if (!tours || tours.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography>Không có tour nào để hiển thị</Typography>
        <Button onClick={onRetry} sx={{ mt: 2 }}>
          Tải lại
        </Button>
      </Box>
    );
  }

  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN");
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        boxShadow: 3,
        minHeight: "100vh",
      }}
    >
      {/* Header: số lượng + sort */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 2,
          mb: 3,
        }}
      >
        <Typography sx={{ mt: 3, fontWeight: "bold", fontSize: "1.2rem" }}>
          Tìm thấy {pagination.totalElements} tour cho quý khách.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              sx={{ borderRadius: "20px", minWidth: 180 }}
              renderValue={(selected) =>
                selected === ""
                  ? "Sắp xếp theo"
                  : {
                      priceAsc: "Giá thấp ↑ cao",
                      priceDesc: "Giá cao ↓ thấp",
                      newest: "Mới nhất",
                    }[selected]
              }
            >
              <MenuItem value="">Sắp xếp theo</MenuItem>
              <MenuItem value="priceAsc">Giá thấp ↑ cao</MenuItem>
              <MenuItem value="priceDesc">Giá cao ↓ thấp</MenuItem>
              <MenuItem value="newest">Mới nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Danh sách tour */}
      <Box sx={{ pb: 3 }}>
        <Grid container spacing={3} sx={{ justifyContent: "center", px: 2 }}>
          {tours.map((tour) => (
            <Grid item xs={12} key={tour.tourID}>
              <Box
                sx={{
                  display: "flex",
                  minHeight: 280,
                  borderRadius: 1,
                  p: 1,
                  boxShadow: 3,
                  height: "100%",
                  width: "100%",
                  backgroundColor: "background.paper",
                  overflow: "hidden",
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={12} md={4}>
                    <Box
                      onClick={() => onTourDetailClick(tour.tourID)}
                      sx={{
                        minHeight: 280,
                        flexShrink: 0,
                        backgroundImage: `url(${tour.images[0]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        cursor: "pointer",
                        borderRadius: 1,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)", // hiệu ứng khi hover
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        mx: 2,
                      }}
                    >
                      <Typography variant="caption">
                        <LocationOnIcon
                          sx={{ verticalAlign: "middle", fontSize: "small" }}
                        />
                        {tour.destination}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          onClick={() => onTourDetailClick(tour.tourID)}
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1.6rem",
                            lineHeight: 1.2,
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            cursor: "pointer",
                            mt: 1,
                          }}
                        >
                          {tour.title}
                        </Typography>
                      </Box>

                      <Box
                        onClick={() => onTourDetailClick(tour.tourID)}
                        sx={{ mt: 3, cursor: "pointer" }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6} md={6}>
                            <Typography
                              variant="caption"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "1rem",
                                gap: 1,
                              }}
                            >
                              <QrCode2Icon sx={{ mr: 0.5 }} />
                              Mã tour:&nbsp;
                              <Typography sx={{ fontWeight: 500 }}>
                                {tour.tourCode}
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Typography
                              variant="caption"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "1rem",

                                gap: 1,
                              }}
                            >
                              <MyLocationIcon sx={{ mr: 0.5 }} />
                              Khởi hành:&nbsp;
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                }}
                              >
                                {tour.departureLocation}
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Typography
                              variant="caption"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "1rem",
                                gap: 1,
                              }}
                            >
                              <AccessTimeIcon sx={{ mr: 0.5 }} />
                              Thời gian:&nbsp;
                              <Typography sx={{ fontWeight: 500 }}>
                                {tour.duration}
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Typography
                              variant="caption"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "1rem",
                                gap: 1,
                              }}
                            >
                              <FlightTakeoffIcon sx={{ mr: 0.5 }} />
                              Phương tiện:&nbsp;
                              <Typography sx={{ fontWeight: 500 }}>
                                {tour.transportation}
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <CalendarMonthIcon
                          sx={{ fontSize: 20, color: "text.secondary" }}
                        />

                        <Typography
                          sx={{
                            fontSize: "0.95rem",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Ngày khởi hành:
                        </Typography>

                        <Box
                          onClick={() => onTourDetailClick(tour.tourID)}
                          sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          {tour.startDates?.map((item) => {
                            const date = new Date(item.startDate);
                            const day = date
                              .getDate()
                              .toString()
                              .padStart(2, "0");
                            const month = (date.getMonth() + 1)
                              .toString()
                              .padStart(2, "0");

                            return (
                              <Box
                                key={item.id}
                                sx={{
                                  px: 1.2,
                                  py: 0.4,
                                  border: "1px solid ",
                                  borderColor: "primary.main",
                                  borderRadius: "8px",
                                  color: "primary.main",
                                  fontSize: "0.85rem",
                                  fontWeight: 500,
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    backgroundColor: "primary.main",
                                    color: "#fff",
                                  },
                                }}
                              >
                                {day}/{month}
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>

                      <Divider sx={{ mt: 3 }} />

                      <Box sx={{ mx: 2, mt: 2, mb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 2,
                          }}
                        >
                          {/* PRICE */}
                          <Typography
                            sx={{
                              fontSize: "1.25rem",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "flex-end",
                              gap: 0.5,
                            }}
                          >
                            {formatPrice(tour.priceAdult)}
                            <Typography
                              component="span"
                              sx={{
                                fontSize: "0.7rem",
                                color: "text.secondary",
                                mb: 0.2,
                              }}
                            >
                              VND
                            </Typography>
                          </Typography>

                          {/* BUTTON */}
                          <Button
                            onClick={() => onTourDetailClick(tour.tourID)}
                            variant="contained"
                            sx={{
                              px: 3,
                              py: 1.2,
                              fontWeight: 600,
                              borderRadius: 1.5,
                              whiteSpace: "nowrap",
                              color: "white",
                            }}
                          >
                            XEM CHI TIẾT
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            sx={{ my: 2, color: "#fff" }}
            color="primary"
            size="large"
            count={pagination.totalPages || 0}
            page={(pagination.currentPage || 0) + 1}
            onChange={onPageChange}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TourList;

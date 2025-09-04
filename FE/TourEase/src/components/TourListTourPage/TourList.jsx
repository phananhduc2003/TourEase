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

function TourList({
  tours,
  loading,
  error,
  pagination,
  onRetry,
  onPageChange,
  sortOption,
  onSortChange,
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
        <Typography sx={{ mt: 3 }}>
          Tours Tìm Thấy {pagination.totalElements}
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
        <Grid container spacing={2} sx={{ justifyContent: "center", px: 2 }}>
          {tours.map((tour) => (
            <Grid item xs={12} sm={6} md={4} key={tour.tourID}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 1,
                  p: 1,
                  boxShadow: 3,
                  height: "100%",
                  width: "100%",
                  backgroundColor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    aspectRatio: "4/3",
                    width: "100%",
                    backgroundImage: `url(${tour.images[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 1,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)", // hiệu ứng khi hover
                    },
                  }}
                />
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    mx: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ mt: 2 }}>
                    {" "}
                    <LocationOnIcon
                      sx={{ verticalAlign: "middle", fontSize: "small" }}
                    />{" "}
                    {tour.destination}{" "}
                  </Typography>
                  <Box
                    sx={{
                      minHeight: { xs: "3.5rem", sm: "4rem" },
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {" "}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        lineHeight: 1.2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {tour.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {" "}
                    {tour.duration}{" "}
                  </Typography>
                </Box>
                <Divider sx={{ my: 4 }} />
                <Box sx={{ display: "flex", mx: 2, mt: 2, mb: 1 }}>
                  {" "}
                  <Grid container sx={{ width: "100%" }}>
                    {" "}
                    <Grid item xs={6}>
                      {" "}
                      <Typography variant="h6" fontWeight="bold">
                        {" "}
                        {tour.priceAdult}{" "}
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.5rem" }}
                        >
                          {" "}
                          VND{" "}
                        </Typography>{" "}
                      </Typography>{" "}
                    </Grid>{" "}
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "relative",
                      }}
                    >
                      {" "}
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          width: "110px",
                          height: "40px",
                          position: "absolute",
                          right: 0,
                          top: -4,
                        }}
                      >
                        {" "}
                        Đặt Ngay{" "}
                      </Button>{" "}
                    </Grid>{" "}
                  </Grid>{" "}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            sx={{ my: 2 }}
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

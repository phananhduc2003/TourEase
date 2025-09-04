import {
  Box,
  Button,
  Checkbox,
  Divider,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Alert,
  Grid,
  MenuItem,
  Radio,
  Rating,
  Select,
  Slider,
  Typography,
  Pagination,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import { ApiFilterTour } from "../../../api/user/ApiFilterTour";
import { ApiGetDestinations } from "../../../api/user/ApiGetDestinations";

function TourPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [tours, setTours] = useState([]);
  const [pagination, setPagination] = useState({});
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const [filters, setFilters] = useState({
    page: 0,
    size: 9,
    destinations: [],
    minPrice: "",
    maxPrice: "",
    sortBy: "tourID",
    sortDir: "desc",
  });

  useEffect(() => {
    loadTours();
  }, [filters]);

  useEffect(() => {
    getDestinations();
  }, []);

  const loadTours = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiFilterTour(filters);
      setTours(response.data.tours);

      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      });
    } catch (error) {
      setError(error.message || "Không thể tải dữ liệu");
      console.error("Error loading tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDestinations = async () => {
    try {
      const response = await ApiGetDestinations();
      setDestinations(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    // Material-UI Pagination: newPage bắt đầu từ 1
    // Backend: page bắt đầu từ 0
    // Nên cần trừ đi 1
    const backendPage = newPage - 1;
    setFilters((prev) => ({ ...prev, page: backendPage }));
    // Optional: Scroll to top khi chuyển trang
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Thay đổi filter
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 0 }));
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  //  Áp dụng filter giá khi slider thay đổi (sau khi user thả tay)
  const handlePriceRangeChangeCommitted = (event, newValue) => {
    const [minTrieu, maxTrieu] = newValue;

    const minPrice = minTrieu * 1000000;
    const maxPrice = maxTrieu * 1000000;

    // Cập nhật filters
    handleFilterChange({
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  };

  const handleDestinationChange = (destination) => {
    let newSelectedDestinations;

    if (selectedDestinations.includes(destination)) {
      newSelectedDestinations = selectedDestinations.filter(
        (dest) => dest !== destination
      );
    } else {
      newSelectedDestinations = [...selectedDestinations, destination];
    }

    setSelectedDestinations(newSelectedDestinations);

    handleFilterChange({
      destinations: newSelectedDestinations,
    });
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    switch (option) {
      case "priceAsc":
        handleFilterChange({ sortBy: "price", sortDir: "asc" });
        break;
      case "priceDesc":
        handleFilterChange({ sortBy: "price", sortDir: "desc" });
        break;
      case "newest":
        handleFilterChange({ sortBy: "date", sortDir: "desc" }); // hoặc "tourID"
        break;
      default:
        // không đổi gì
        break;
    }
  };

  const handleClearFilters = () => {
    setPriceRange([0, 10]);
    setSortOption("");
    setSelectedDestinations([]);
    setFilters({
      page: 0,
      size: 6,
      destinations: [],
      minPrice: "",
      maxPrice: "",
      sortBy: "tourID",
      sortDir: "desc",
    });
  };

  const formatPrice = (value) => {
    return `${value} triệu`;
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
        <Typography sx={{ ml: 2 }}>Đang tải ...</Typography>
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
          <Button color="inherit" size="small" onClick={loadTours}>
            Thử lại
          </Button>
        }
      >
        Lỗi tải dữ liệu: {error}
      </Alert>
    );
  }

  // Empty state
  if (!tours || tours.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Không có tour nào để hiển thị
        </Typography>
        <Button variant="outlined" onClick={loadTours} sx={{ mt: 2 }}>
          Tải lại
        </Button>
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Box sx={{ width: "80%" }}>
        <Grid container spacing={2}>
          <Grid
            item
            md={3}
            sx={{
              display: { xs: "none", sm: "none", lg: "block" },
              minHeight: "100vh",
            }}
          >
            <Box
              sx={{
                width: "100%",
                position: "sticky",
                top: 0,
                height: "100vh", // Đặt chiều cao cố định
                overflowY: "auto",
                backgroundColor: "background.paper",
                boxShadow: 3,
                overflowX: "hidden",
              }}
            >
              <Box
                sx={{
                  mx: 2,
                  display: "flex",

                  flexDirection: "column",
                  mt: 3,
                }}
              >
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClearFilters}
                    sx={{
                      width: "100px",
                      height: "40px",
                    }}
                  >
                    Clear
                  </Button>
                </Box>
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}
                >
                  lọc theo giá
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Slider
                    getAriaLabel={() => "Price range"}
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    onChangeCommitted={handlePriceRangeChangeCommitted}
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatPrice}
                    min={0}
                    max={10}
                    step={1}
                    // marks={[
                    //   { value: 0 },
                    //   { value: 1 },
                    //   { value: 2 },
                    //   { value: 3 },
                    //   { value: 4 },
                    //   { value: 5 },
                    //   { value: 6 },
                    //   { value: 7 },
                    //   { value: 8 },
                    //   { value: 9 },
                    //   { value: 10 },
                    // ]}
                  />
                </Box>
                <Typography
                  sx={{
                    color: "text.primary",
                    mb: 3,
                    fontSize: "0.9rem",
                  }}
                >
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}
                >
                  Điểm đến
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {destinations.map((dest) => (
                    <FormGroup key={dest}>
                      <Box sx={{ display: "flex" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedDestinations.includes(dest)} // ✅ Controlled checkbox
                              onChange={() => handleDestinationChange(dest)} // ✅ Handle change
                            />
                          }
                          label={dest}
                        />
                      </Box>
                    </FormGroup>
                  ))}

                  {selectedDestinations.length > 0 && (
                    <Box
                      sx={{
                        mt: 1,
                        p: 1,
                        backgroundColor: "grey.100",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="caption" color="primary">
                        Đang filter: {selectedDestinations.join(", ")}
                      </Typography>
                    </Box>
                  )}

                  {selectedDestinations.length > 0 && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setSelectedDestinations([]);
                        handleFilterChange({ destinations: [] });
                      }}
                      sx={{ mt: 1 }}
                    >
                      Xóa tất cả điểm đến
                    </Button>
                  )}
                </Box>

                <Divider sx={{ mb: 3 }} />
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}
                >
                  Đánh giá
                </Typography>
                <Box>
                  <FormGroup>
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <Box
                        key={stars}
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Radio />
                        <Rating
                          value={stars}
                          readOnly
                          precision={0.5}
                          sx={{
                            color: "#f57c00", // Màu cam như hình
                          }}
                        />
                      </Box>
                    ))}
                  </FormGroup>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Box
              sx={{
                backgroundColor: "background.paper",
                boxShadow: 3,
                minHeight: "100vh",
              }}
            >
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
                      onChange={(e) => handleSortChange(e.target.value)}
                      sx={{ borderRadius: "20px" }}
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
              <Box sx={{ pb: 3 }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: "center", px: 2 }}
                >
                  {tours.map((tour) => (
                    <Grid key={tour.tourID} item xs={12} sm={6} md={4}>
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
                        ></Box>
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            flexDirection: "column",
                            mx: 2,
                          }}
                        >
                          <Typography variant="caption" sx={{ mt: 2 }}>
                            <LocationOnIcon
                              sx={{
                                verticalAlign: "middle",
                                fontSize: "small",
                              }}
                            />
                            {tour.destination}
                          </Typography>
                          <Box
                            sx={{
                              minHeight: { xs: "3.5rem", sm: "4rem" }, // Different heights for different screens
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                lineHeight: 1.2,
                                display: "-webkit-box",
                                WebkitLineClamp: 2, // Limit to 2 lines
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {tour.title}
                            </Typography>
                          </Box>

                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {tour.duration}
                          </Typography>
                        </Box>
                        <Divider sx={{ mt: 4 }} />
                        <Box sx={{ display: "flex", mx: 2, mt: 2, mb: 1 }}>
                          <Grid container sx={{ width: "100%" }}>
                            <Grid item xs={6}>
                              <Typography variant="h6" fontWeight="bold">
                                {tour.priceAdult}
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ fontSize: "0.5rem" }}
                                >
                                  VND
                                </Typography>
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                position: "relative",
                              }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                // component={Link}
                                to="/tours/1"
                                sx={{
                                  width: "110px",
                                  height: "40px",
                                  position: "absolute",
                                  right: 0,
                                  top: -4,
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
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  sx={{ my: 2 }}
                  count={pagination.totalPages || 0}
                  page={(pagination.currentPage || 0) + 1} // Hiện tại + 1 (vì MUI bắt đầu từ 1)
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default TourPage;

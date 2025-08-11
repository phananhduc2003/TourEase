import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Rating,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";

function TourPage() {
  const [value, setValue] = useState([0, 100]);

  const imagetest =
    "https://kichcaudulichtphcm.vn/wp-content/uploads/2024/08/thanh-pho-hoi-an-quang-nam.jpg";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                  />
                </Box>
                <Typography
                  sx={{
                    color: "text.primary",
                    mb: 3,
                    fontSize: "0.9rem",
                  }}
                >
                  0triệu - 200triệu
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}
                >
                  Điểm đến
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <FormGroup>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Miền Bắc"
                      />
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: " center",
                          alignItems: "center",
                        }}
                      >
                        7
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Miền Trung"
                      />
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: " center",
                          alignItems: "center",
                        }}
                      >
                        3
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Miền Nam"
                      />
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: " center",
                          alignItems: "center",
                        }}
                      >
                        5
                      </Typography>
                    </Box>
                  </FormGroup>
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
            <Box sx={{ backgroundColor: "background.paper", boxShadow: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mx: 2,
                  mb: 3,
                }}
              >
                <Typography sx={{ mt: 3 }}>Tours Tìm Thấy</Typography>
                <Box sx={{ mt: 3 }}>
                  <FormControl fullWidth size="small">
                    <Select
                      displayEmpty
                      defaultValue=""
                      sx={{
                        borderRadius: "20px",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Sắp xếp theo
                      </MenuItem>
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
                  <Grid item xs={12} sm={6} md={4}>
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
                          backgroundImage: `url(${imagetest})`,
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
                            sx={{ verticalAlign: "middle", fontSize: "small" }}
                          />
                          Miền Trung
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Biển Đảo 4N3Đ | Phú Quốc(Khởi hành mỗi ngày)
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 1 }}>
                          4 ngày 3 đêm
                        </Typography>
                      </Box>
                      <Divider sx={{ mt: 4 }} />
                      <Box sx={{ display: "flex", mx: 2, mt: 2, mb: 1 }}>
                        <Grid container sx={{ width: "100%" }}>
                          <Grid item xs={6}>
                            <Typography variant="h6" fontWeight="bold">
                              3.990.000{" "}
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: "0.5rem" }}
                              >
                                VND / người
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
                  {/* x3 card */}
                  <Grid item xs={12} sm={6} md={4}>
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
                          backgroundImage: `url(${imagetest})`,
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
                            sx={{ verticalAlign: "middle", fontSize: "small" }}
                          />
                          Miền Trung
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Biển Đảo 4N3Đ | Phú Quốc(Khởi hành mỗi ngày)
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 1 }}>
                          4 ngày 3 đêm
                        </Typography>
                      </Box>
                      <Divider sx={{ mt: 4 }} />
                      <Box sx={{ display: "flex", mx: 2, mt: 2, mb: 1 }}>
                        <Grid container sx={{ width: "100%" }}>
                          <Grid item xs={6}>
                            <Typography variant="h6" fontWeight="bold">
                              3.990.000{" "}
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: "0.5rem" }}
                              >
                                VND / người
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
                  <Grid item xs={12} sm={6} md={4}>
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
                          backgroundImage: `url(${imagetest})`,
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
                            sx={{ verticalAlign: "middle", fontSize: "small" }}
                          />
                          Miền Trung
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Biển Đảo 4N3Đ | Phú Quốc(Khởi hành mỗi ngày)
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 1 }}>
                          4 ngày 3 đêm
                        </Typography>
                      </Box>
                      <Divider sx={{ mt: 4 }} />
                      <Box sx={{ display: "flex", mx: 2, mt: 2, mb: 1 }}>
                        <Grid container sx={{ width: "100%" }}>
                          <Grid item xs={6}>
                            <Typography variant="h6" fontWeight="bold">
                              3.990.000{" "}
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: "0.5rem" }}
                              >
                                VND / người
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
                  <Grid item xs={12} sm={6} md={4}>
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
                          backgroundImage: `url(${imagetest})`,
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
                            sx={{ verticalAlign: "middle", fontSize: "small" }}
                          />
                          Miền Trung
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Biển Đảo 4N3Đ | Phú Quốc(Khởi hành mỗi ngày)
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 1 }}>
                          4 ngày 3 đêm
                        </Typography>
                      </Box>
                      <Divider sx={{ mt: 4 }} />
                      <Box sx={{ display: "flex", mx: 2, mt: 2, mb: 1 }}>
                        <Grid container sx={{ width: "100%" }}>
                          <Grid item xs={6}>
                            <Typography variant="h6" fontWeight="bold">
                              3.990.000{" "}
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: "0.5rem" }}
                              >
                                VND / người
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
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default TourPage;

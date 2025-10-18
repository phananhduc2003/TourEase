import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function Footer() {
  return (
    <>
      <Box
        sx={{
          minHeight: "80vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#2a2a2a", // Dark background
          color: "white",
          pt: 6,
          pb: 4,
        }}
      >
        <Box
          sx={{
            width: "85%",
            maxWidth: "1200px",
          }}
        >
          {/* Top Section - Logo and Newsletter */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              {/* Logo and Description */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #ff6b35, #f7931e)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      T
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    TourEase
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#b0b0b0",
                    lineHeight: 1.6,
                    maxWidth: "400px",
                  }}
                >
                  Chúng tôi ban soạn các hành trình nâng tầm phù hợp với sở
                  thích của bạn, điểm đến tuyệt đẹp và địa điểm mang tính thể
                  thao với khách của viên ngọc ẩn giấu
                </Typography>
              </Box>

              {/* Social Media Icons */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  sx={{
                    backgroundColor: "#3a3a3a",
                    color: "#b0b0b0",
                    "&:hover": { backgroundColor: "#4a4a4a", color: "white" },
                  }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: "#3a3a3a",
                    color: "#b0b0b0",
                    "&:hover": { backgroundColor: "#4a4a4a", color: "white" },
                  }}
                >
                  <YouTubeIcon />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: "#3a3a3a",
                    color: "#b0b0b0",
                    "&:hover": { backgroundColor: "#4a4a4a", color: "white" },
                  }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: "#3a3a3a",
                    color: "#b0b0b0",
                    "&:hover": { backgroundColor: "#4a4a4a", color: "white" },
                  }}
                >
                  <TwitterIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Newsletter Section */}
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    mb: 2,
                  }}
                >
                  Đăng Ký Nhận Bản Tin
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#b0b0b0",
                    mb: 3,
                  }}
                >
                  Website{" "}
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      px: 1,
                      borderRadius: 1,
                      fontSize: "12px",
                    }}
                  >
                    5000+
                  </Box>{" "}
                  trải nghiệm phù hợp nhật và hoạn sẽ nhớ
                </Typography>
                <Box sx={{ display: "flex", gap: 0 }}>
                  <TextField
                    placeholder="Email Address"
                    variant="outlined"
                    sx={{
                      flex: 1,

                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: "25px 0 0 25px",
                        "& fieldset": {
                          border: "none",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px 16px",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "background.main",
                      borderRadius: "0 25px 25px 0",
                      color: "text.primary",
                      px: 3,
                      "&:hover": {
                        backgroundColor: "background.main",
                      },
                    }}
                  >
                    Đăng Ký
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Bottom Section - Links */}
          <Grid container spacing={4}>
            {/* Dịch Vụ */}
            <Grid item xs={12} sm={6} md={2.4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  mb: 2,
                }}
              >
                Dịch Vụ
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Hướng dẫn viên du lịch tốt nhất
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Đặt Tour
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Đặt vé
                </Link>
              </Box>
            </Grid>

            {/* Công Ty */}
            <Grid item xs={12} sm={6} md={2.4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  mb: 2,
                }}
              >
                Công Ty
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Giới thiệu về công ty
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Việc làm và nghề nghiệp
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Liên hệ với chúng tôi
                </Link>
              </Box>
            </Grid>

            {/* Điểm Đến */}
            <Grid item xs={12} sm={6} md={2.4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  mb: 2,
                }}
              >
                Điểm Đến
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Miền Bắc
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Miền Trung
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Miền Nam
                </Link>
              </Box>
            </Grid>

            {/* Thể Loại */}
            <Grid item xs={12} sm={6} md={2.4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  mb: 2,
                }}
              >
                Thể Loại
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Phiêu lưu
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Tour gia đình
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: "#b0b0b0",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": { color: "white" },
                  }}
                >
                  › Tour động vật hoang dã
                </Link>
              </Box>
            </Grid>

            {/* Liên Hệ */}
            <Grid item xs={12} sm={6} md={2.4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  mb: 2,
                }}
              >
                Liên Hệ
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <LocationOnIcon
                    sx={{ color: "primary.main", fontSize: "20px", mt: 0.2 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#b0b0b0",
                      fontSize: "14px",
                      lineHeight: 1.4,
                    }}
                  >
                    470 Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon sx={{ color: "primary.main", fontSize: "20px" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#b0b0b0",
                      fontSize: "14px",
                    }}
                  >
                    marksteven.dev@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon
                    sx={{ color: "primary.main", fontSize: "20px" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#b0b0b0",
                      fontSize: "14px",
                    }}
                  >
                    Thứ 2 - Thứ 6, 08am - 05pm
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon sx={{ color: "primary.main", fontSize: "20px" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#b0b0b0",
                      fontSize: "14px",
                    }}
                  >
                    +840 (123) 456 88
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Copyright */}
          <Box
            sx={{
              borderTop: "1px solid #3a3a3a",
              mt: 4,
              pt: 3,
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#b0b0b0",
                fontSize: "14px",
              }}
            >
              © 2025 TourEase. All rights reserved. | Privacy Policy | Terms of
              Service
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Footer;

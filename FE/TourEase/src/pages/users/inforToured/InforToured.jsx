import { Box, Typography, Grid, Button } from "@mui/material";

function InforToured() {
  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
    >
      <Box
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
        }}
      >
        {/* Hình ảnh */}
        <Box
          sx={{
            width: "30%",
            height: "100%",
            backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLdXjgbWv1a4H_wGdWwB-4fJRhfECK3VMkFw&s)`, // Thay bằng URL hình ảnh thực tế
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
          }}
        ></Box>

        {/* Nội dung */}
        <Box sx={{ width: "70%", pl: 2 }}>
          {/* Địa điểm */}
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: "bold",
              mb: 1,
              display: "block",
            }}
          >
            ĐÀ NẴNG - HỘI AN - BÀ NÀ - HUẾ
          </Typography>

          {/* Tiêu đề */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              mb: 1,
            }}
          >
            MIỀN TRUNG 4N3Đ | ĐÀ NẴNG – HỘI AN – BÀ NÀ – HUẾ
          </Typography>

          {/* Điểm nhấn */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: 1,
            }}
          >
            <strong>Điểm nhấn:</strong> Bán đảo Sơn Trà, Linh Ứng Tự, đến thờ Bà
            Chúa Mẫu Thượng Ngàn, Cầu Tình Yêu, Đại Nội – Hoàng Cung Triều
            Nguyễn.
          </Typography>

          {/* Thông tin thêm */}
          <Grid container spacing={1} sx={{ alignItems: "center", mb: 1 }}>
            <Grid item>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                4 ngày 3 đêm
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                3 người
              </Typography>
            </Grid>
          </Grid>

          {/* Giá */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            10,070,000 VND
          </Typography>

          {/* Button */}
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
            Đợi xác nhận
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default InforToured;

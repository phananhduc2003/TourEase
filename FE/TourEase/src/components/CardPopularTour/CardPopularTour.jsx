import Masonry from "@mui/lab/Masonry";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ApiPopularTour } from "../../api/user/ApiPopularTour";

function CardPopularTour({ onclickChangePage }) {
  const heights = [280, 350, 180, 420, 320, 250];

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
      const response = await ApiPopularTour();

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
    <Box
      sx={{
        width: "100%",
        padding: 2,
        mt: 3,
        mx: "auto",
        maxWidth: "1200px",
      }}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {datas.map((data, index) => (
          <Card
            onClick={() => onclickChangePage(data.tourID)}
            key={data.tourID}
            sx={{
              borderRadius: 2,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <CardMedia
              component="img"
              image={data.images[0]}
              alt={data.title}
              sx={{
                width: "100%",
                height: heights[index % heights.length], // Gán chiều cao từ mảng
                objectFit: "cover",
                display: "block",
                borderRadius: 1,
              }}
            />
            <CardContent>
              <Typography
                fontWeight="bold"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {data.title}
              </Typography>
              <Typography variant="body2">{data.duration}</Typography>
            </CardContent>
          </Card>
        ))}
      </Masonry>
    </Box>
  );
}

export default CardPopularTour;

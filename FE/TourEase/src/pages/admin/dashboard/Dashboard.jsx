import { Box, Grid, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import WifiIcon from "@mui/icons-material/Wifi";
import PeopleIcon from "@mui/icons-material/People";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RevenueChart from "../components/RevenueChart/RevenueChart";
import BookingStatusChart from "../components/BookingStatusChart/BookingStatusChart";
import TopToursChart from "../components/topToursChart/TopToursChart";
import { useState } from "react";

const revenueData = [
  { date: "01/01", revenue: 45000000, bookings: 12 },
  { date: "02/01", revenue: 52000000, bookings: 15 },
  { date: "03/01", revenue: 48000000, bookings: 13 },
  { date: "04/01", revenue: 61000000, bookings: 18 },
  { date: "05/01", revenue: 55000000, bookings: 16 },
  { date: "06/01", revenue: 67000000, bookings: 20 },
  { date: "07/01", revenue: 73000000, bookings: 22 },
];

const topToursData = [
  { tourName: "Hạ Long - Sapa 5N4Đ", bookings: 45, revenue: 180000000 },
  { tourName: "Phú Quốc Resort 4N3Đ", bookings: 38, revenue: 152000000 },
  { tourName: "Đà Nẵng - Hội An 3N2Đ", bookings: 32, revenue: 96000000 },
  { tourName: "Nha Trang Biển Xanh", bookings: 28, revenue: 84000000 },
  { tourName: "TPHCM - Mũi Né 2N1Đ", bookings: 22, revenue: 55000000 },
];

const bookingStatusData = [
  { status: "Confirmed", value: 145, color: "#4caf50" },
  { status: "Pending", value: 32, color: "#ff9800" },
  { status: "Cancelled", value: 18, color: "#f44336" },
  { status: "Completed", value: 89, color: "#2196f3" },
];

function Dashboard() {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", p: 1, mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                pr: 2,
                borderRight: {
                  xs: "none",
                  md: "2px solid #c7c7c7",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <WifiIcon sx={{ fontSize: 20 }} />
                </Box>
                <Typography sx={{ ml: 1, fontSize: "1rem" }}>
                  Tổng số tour đang hoạt động
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <ArrowDropUpIcon
                    sx={{ fontSize: 30, color: "primary.main" }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "primary.main",
                    position: "relative",
                    bottom: 5,
                  }}
                >
                  10
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                pr: 2,
                borderRight: {
                  xs: "none",
                  md: "2px solid #e0e0e0",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <PublishedWithChangesIcon sx={{ fontSize: 20 }} />
                </Box>
                <Typography sx={{ ml: 1, fontSize: "1rem" }}>
                  Tổng số lượng Booking
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <ArrowDropUpIcon
                    sx={{ fontSize: 30, color: "primary.main" }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "primary.main",
                    position: "relative",
                    bottom: 5,
                  }}
                >
                  20
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                pr: 2,
                borderRight: {
                  xs: "none",
                  md: "2px solid #e0e0e0",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <PeopleIcon sx={{ fontSize: 20 }} />
                </Box>
                <Typography sx={{ ml: 1, fontSize: "1rem" }}>
                  Số người đăng ký
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <ArrowDropUpIcon
                    sx={{ fontSize: 30, color: "primary.main" }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "primary.main",
                    position: "relative",
                    bottom: 5,
                  }}
                >
                  2.145
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                pr: 2,
                borderRight: {
                  xs: "none",
                  md: "2px solid #e0e0e0",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <CurrencyExchangeIcon sx={{ fontSize: 20 }} />
                </Box>
                <Typography sx={{ ml: 1, fontSize: "1rem" }}>
                  Tổng doanh thu
                </Typography>
              </Box>
              <Box sx={{ display: "flex", ml: 1 }}>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "primary.main",
                    position: "relative",
                    bottom: 5,
                  }}
                >
                  100.000.000
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          {/* Charts */}
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <RevenueChart
                data={revenueData}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <BookingStatusChart data={bookingStatusData} />
            </Grid>

            <Grid item xs={12}>
              <TopToursChart data={topToursData} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;

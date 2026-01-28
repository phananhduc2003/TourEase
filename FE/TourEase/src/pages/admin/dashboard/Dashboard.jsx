import { Alert, Box, CircularProgress, Grid, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import WifiIcon from "@mui/icons-material/Wifi";
import PeopleIcon from "@mui/icons-material/People";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RevenueChart from "../components/RevenueChart/RevenueChart";
import BookingStatusChart from "../components/BookingStatusChart/BookingStatusChart";
import TopToursChart from "../components/topToursChart/TopToursChart";
import { useEffect, useState } from "react";
import { ApiGetRevenueData } from "../../../api/admin/ApiGetRevenueData";
import { ApiGetTopTours } from "../../../api/admin/ApiGetTopTours";
import { ApiGetBookingStatus } from "../../../api/admin/ApiGetBookingStatus";
import { ApiGetStatsOverview } from "../../../api/admin/ApiGetStatsOverview";

function Dashboard() {
  const [timeRange, setTimeRange] = useState("week");

  const [dataRevenue, setDataRevenue] = useState([]);
  const [dataTopTours, setDataTopTours] = useState([]);
  const [dataBookingStatus, setDataBookingStatus] = useState([]);
  const [statsOverview, setStatsOverview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [revenueRes, topToursRes, bookingStatusRes, statsRes] =
        await Promise.all([
          ApiGetRevenueData(timeRange),
          ApiGetTopTours(),
          ApiGetBookingStatus(),
          ApiGetStatsOverview(),
        ]);

      setDataRevenue(revenueRes.data);
      setDataTopTours(topToursRes.data);
      setDataBookingStatus(bookingStatusRes.data);
      setStatsOverview(statsRes.data);
    } catch (error) {
      setError(error.message || "Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Box>
    );
  }

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
                  {statsOverview?.activeTours ?? 0}
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
                  {statsOverview?.totalBookings ?? 0}
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
                  {statsOverview?.totalUsers ?? 0}
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
                  {(statsOverview?.totalRevenue ?? 0).toLocaleString("vi-VN")}
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
                data={dataRevenue}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <BookingStatusChart data={dataBookingStatus} />
            </Grid>

            <Grid item xs={12}>
              <TopToursChart data={dataTopTours} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;

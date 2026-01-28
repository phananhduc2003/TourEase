import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";

function TopToursChart({ data }) {
  const theme = useTheme();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value);
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 1.5,
            border: "1px solid #ccc",
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.name.includes("Doanh thu")
                ? formatCurrency(entry.value)
                : entry.value}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };
  function shortenTitle(title) {
    const maxLength = 20; // Adjust the maximum length as needed
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  }
  return (
    <>
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
            color="text.primary"
          >
            Top 5 Tours Phổ Biến Nhất
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tick={{ fontSize: 14, fill: theme.palette.text.primary }}
              />
              <YAxis
                dataKey="tourName"
                type="category"
                width={150}
                tick={{ fontSize: 14, fill: theme.palette.text.primary }}
                tickFormatter={shortenTitle}
                color=""
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="bookings"
                name="Số lượt đặt"
                fill="#1976d2"
                radius={[0, 8, 8, 0]}
              />
              <Bar
                dataKey="revenue"
                name="Doanh thu (VNĐ)"
                fill="#4caf50"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}

export default TopToursChart;

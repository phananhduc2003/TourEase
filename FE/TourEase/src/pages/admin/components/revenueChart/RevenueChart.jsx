import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function RevenueChart({ data, timeRange, onTimeRangeChange }) {
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

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              Doanh Thu Theo Thời Gian
            </Typography>
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={(e, val) => val && onTimeRangeChange(val)}
              size="small"
            >
              <ToggleButton value="week">Tuần</ToggleButton>
              <ToggleButton value="month">Tháng</ToggleButton>
              <ToggleButton value="year">Năm</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 14, fill: theme.palette.text.primary }}
              />
              <YAxis
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                tick={{ fontSize: 14, fill: theme.palette.text.primary }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Doanh thu (VNĐ)"
                stroke="#1976d2"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                name="Số đơn"
                stroke="#4caf50"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}

export default RevenueChart;

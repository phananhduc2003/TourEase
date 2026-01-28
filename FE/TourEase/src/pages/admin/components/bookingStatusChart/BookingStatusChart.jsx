import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";

function BookingStatusChart({ data }) {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Trạng Thái Đơn Đặt
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                outerRadius={110}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Stack spacing={1} mt={2}>
            {data.map((item) => (
              <Box
                key={item.status}
                display="flex"
                justifyContent="space-between"
              >
                <Chip
                  label={item.status}
                  size="small"
                  sx={{
                    bgcolor: item.color,
                    color: "text.primary",
                    fontWeight: "bold",
                  }}
                />
                <Typography variant="body2" fontWeight="bold">
                  {item.value} đơn
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default BookingStatusChart;

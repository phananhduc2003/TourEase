import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import { ApiGetManageBookings } from "../../../api/admin/ApiGetManageBookings";
import { useEffect, useState, useMemo } from "react";

const BOOKING_STATUS_LABEL = {
  PENDING: "Chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  CANCELLED: "Đã hủy",
  COMPLETED: "Hoàn thành",
};

const PAYMENT_STATUS_LABEL = {
  PENDING: "Chờ thanh toán",
  SUCCESS: "Đã thanh toán",
  FAILED: "Thất bại",
  REFUNDED: "Hoàn tiền",
};

const PAYMENT_METHOD_LABEL = {
  VNPAY: "VNPay",
  BANK_TRANSFER: "Chuyển khoản",
  CASH: "Tiền mặt",
  CREDIT_CARD: "Thẻ tín dụng",
  MOMO: "MoMo",
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

const BOOKING_STATUS_STYLE = {
  CONFIRMED: { bg: "#0d3321", text: "#4ade80", border: "#166534" },
  COMPLETED: { bg: "#0d3321", text: "#4ade80", border: "#166534" },
  PENDING: { bg: "#3a2500", text: "#fbbf24", border: "#78350f" },
  CANCELLED: { bg: "#3a0a0a", text: "#f87171", border: "#7f1d1d" },
};
const BOOKING_STATUS_STYLE_LIGHT = {
  CONFIRMED: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
  COMPLETED: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
  PENDING: { bg: "#fef3c7", text: "#92400e", border: "#fde68a" },
  CANCELLED: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
};

const PAYMENT_STATUS_STYLE = {
  SUCCESS: { bg: "#0d3321", text: "#4ade80", border: "#166534" },
  PENDING: { bg: "#3a2500", text: "#fbbf24", border: "#78350f" },
  FAILED: { bg: "#3a0a0a", text: "#f87171", border: "#7f1d1d" },
  REFUNDED: { bg: "#0c2a3a", text: "#38bdf8", border: "#0c4a6e" },
};
const PAYMENT_STATUS_STYLE_LIGHT = {
  SUCCESS: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
  PENDING: { bg: "#fef3c7", text: "#92400e", border: "#fde68a" },
  FAILED: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
  REFUNDED: { bg: "#e0f2fe", text: "#075985", border: "#bae6fd" },
};

function ManageBookings() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const t = theme.palette.table;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    handleGetManageBookings();
  }, []);

  const handleGetManageBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiGetManageBookings();
      setData(response.data);
    } catch (err) {
      console.error("Error fetching manage bookings:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return data;
    const keyword = searchText.toLowerCase();
    return data.filter(
      (item) =>
        item.contactName?.toLowerCase().includes(keyword) ||
        item.contactEmail?.toLowerCase().includes(keyword) ||
        item.contactPhone?.includes(keyword) ||
        String(item.bookingID).includes(keyword),
    );
  }, [data, searchText]);

  const getBookingChipSx = (status) => {
    const s = isDark
      ? BOOKING_STATUS_STYLE[status]
      : BOOKING_STATUS_STYLE_LIGHT[status];
    if (!s) return { fontWeight: "700", minWidth: "105px", height: "26px" };
    return {
      fontWeight: "700",
      minWidth: "105px",
      height: "26px",
      fontSize: "12px",
      backgroundColor: s.bg,
      color: s.text,
      border: `1px solid ${s.border}`,
    };
  };

  const getPaymentChipSx = (status) => {
    const s = isDark
      ? PAYMENT_STATUS_STYLE[status]
      : PAYMENT_STATUS_STYLE_LIGHT[status];
    if (!s) return { fontWeight: "700", minWidth: "115px", height: "26px" };
    return {
      fontWeight: "700",
      minWidth: "115px",
      height: "26px",
      fontSize: "12px",
      backgroundColor: s.bg,
      color: s.text,
      border: `1px solid ${s.border}`,
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        p: 2,
        backgroundColor: "background.default",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box
          sx={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "text.primary",
            letterSpacing: "-0.5px",
          }}
        >
          Quản Lý Bookings
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            width: { xs: "100%", sm: "300px" },
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Tìm tên, email, SĐT, mã..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                height: "40px",
                backgroundColor: "background.paper",
                "& fieldset": { border: "none" },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              minWidth: "50px",
              height: "40px",
              borderRadius: 0,
              backgroundColor: "secondary.light",
              "&:hover": { backgroundColor: "secondary.dark" },
            }}
          >
            <SearchIcon />
          </Button>
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {error && !loading && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="error" mb={2}>
            {error}
          </Typography>
          <Button variant="outlined" onClick={handleGetManageBookings}>
            Thử lại
          </Button>
        </Box>
      )}

      {!loading && !error && (
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
            borderRadius: 2,
            overflowX: "auto",
            width: "100%",
          }}
        >
          <Table sx={{ minWidth: 1400 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: t.header,
                  "& th": {
                    color: t.headerText,
                    fontWeight: "bold",
                    fontSize: "13px",
                    borderBottom: `2px solid ${t.headerBorder}`,
                    py: 1.5,
                    px: 1.5,
                    whiteSpace: "nowrap",
                  },
                }}
              >
                <TableCell sx={{ minWidth: "70px" }}>Mã</TableCell>
                <TableCell sx={{ minWidth: "130px" }}>Khách hàng</TableCell>
                <TableCell sx={{ minWidth: "180px" }}>Email</TableCell>
                <TableCell sx={{ minWidth: "120px" }}>Số ĐT</TableCell>
                <TableCell sx={{ minWidth: "150px" }}>Địa chỉ</TableCell>
                <TableCell sx={{ minWidth: "100px" }}>Ngày đặt</TableCell>
                <TableCell align="center" sx={{ minWidth: "90px" }}>
                  Người lớn
                </TableCell>
                <TableCell align="center" sx={{ minWidth: "80px" }}>
                  Trẻ em
                </TableCell>
                <TableCell align="right" sx={{ minWidth: "140px" }}>
                  Tổng tiền
                </TableCell>
                <TableCell align="center" sx={{ minWidth: "120px" }}>
                  Trạng thái
                </TableCell>
                <TableCell sx={{ minWidth: "110px" }}>Thanh toán</TableCell>
                <TableCell align="center" sx={{ minWidth: "130px" }}>
                  TT Thanh toán
                </TableCell>
                <TableCell align="center" sx={{ minWidth: "100px" }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={13}
                    align="center"
                    sx={{ py: 5, color: "text.secondary" }}
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((booking, index) => (
                  <TableRow
                    key={booking.bookingID}
                    sx={{
                      backgroundColor: index % 2 === 0 ? t.rowOdd : t.rowEven,
                      "&:hover": {
                        backgroundColor: t.rowHover,
                        transition: "all 0.2s ease",
                      },
                      "& td": {
                        borderBottom: `1px solid ${t.rowBorder}`,
                        py: 1.5,
                        px: 1.5,
                        fontSize: "13px",
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: "700", color: t.idColor }}>
                      #{booking.bookingID}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        color: "text.primary",
                      }}
                    >
                      {booking.contactName}
                    </TableCell>

                    <TableCell sx={{ color: t.emailColor }}>
                      {booking.contactEmail}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                        color: "text.primary",
                      }}
                    >
                      {booking.contactPhone}
                    </TableCell>

                    <TableCell
                      sx={{ fontSize: "12px", color: "text.secondary" }}
                    >
                      {booking.contactAddress}
                    </TableCell>

                    <TableCell
                      sx={{ whiteSpace: "nowrap", color: "text.primary" }}
                    >
                      {formatDate(booking.bookingDate)}
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={booking.numAdults}
                        size="small"
                        sx={{
                          backgroundColor: t.adultChipBg,
                          color: t.adultChipText,
                          fontWeight: "700",
                          height: "24px",
                          border: isDark ? `1px solid #0369a1` : "none",
                        }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={booking.numChildren}
                        size="small"
                        sx={{
                          backgroundColor: t.childChipBg,
                          color: t.childChipText,
                          fontWeight: "700",
                          height: "24px",
                          border: isDark ? `1px solid #7c2d12` : "none",
                        }}
                      />
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "700",
                        color: t.priceColor,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatCurrency(booking.totalPrice)}
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={
                          BOOKING_STATUS_LABEL[booking.bookingStatus] ??
                          booking.bookingStatus
                        }
                        size="small"
                        sx={getBookingChipSx(booking.bookingStatus)}
                      />
                    </TableCell>

                    <TableCell
                      sx={{ whiteSpace: "nowrap", color: "text.primary" }}
                    >
                      {PAYMENT_METHOD_LABEL[booking.paymentMethod] ??
                        booking.paymentMethod ??
                        "-"}
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={
                          PAYMENT_STATUS_LABEL[booking.paymentStatus] ??
                          booking.paymentStatus
                        }
                        size="small"
                        sx={getPaymentChipSx(booking.paymentStatus)}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        startIcon={<EditIcon sx={{ fontSize: "16px" }} />}
                        sx={{
                          minWidth: "75px",
                          textTransform: "none",
                          fontWeight: "600",
                          fontSize: "12px",
                          py: 0.5,
                          whiteSpace: "nowrap",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          "&:hover": {
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        Sửa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && !error && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            p: 2,
            backgroundColor: t.footerBg,
            borderRadius: 2,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box sx={{ color: t.footerText, fontSize: "13px" }}>
            {" "}
            Tổng số bookings:{" "}
            <strong style={{ color: theme.palette.text.primary }}>
              {data.length}
            </strong>
          </Box>
          <Box sx={{ color: t.footerText, fontSize: "13px" }}>
            {" "}
            Hiển thị{" "}
            <strong style={{ color: theme.palette.text.primary }}>
              {filteredData.length}
            </strong>{" "}
            trong tổng số{" "}
            <strong style={{ color: theme.palette.text.primary }}>
              {data.length}
            </strong>{" "}
            kết quả
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ManageBookings;

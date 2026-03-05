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
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@mui/material/styles";
import { ApiGetManageTours } from "../../../api/admin/ApiGetManageTours";
import { ApiDeleteTour } from "../../../api/admin/ApiDeleteTour";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const formatCurrency = (amount) => {
  if (!amount) return "-";
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

const AVAILABILITY_STYLE = {
  true: { bg: "#0d3321", text: "#4ade80", border: "#166534" },
  false: { bg: "#3a0a0a", text: "#f87171", border: "#7f1d1d" },
};

const AVAILABILITY_STYLE_LIGHT = {
  true: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
  false: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
};

const highlight = (text, keyword) => {
  if (!keyword.trim() || !text) return text;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = String(text).split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        style={{
          backgroundColor: "#fef08a",
          color: "#713f12",
          borderRadius: "2px",
          padding: "0 1px",
        }}
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
};

function ManageTours() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const t = theme.palette.table;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: !!location.state?.successMessage,
    message: location.state?.successMessage || "",
    severity: "success",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    tourId: null,
    tourName: "",
    loading: false,
  });

  useEffect(() => {
    handleGetManageTours();
  }, []);

  const handleGetManageTours = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiGetManageTours();
      setData(response.data);
    } catch (err) {
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => setSearchText("");
  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((p) => ({ ...p, open: false }));
  };
  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleDelete = (tourId, tourName) =>
    setDeleteDialog({ open: true, tourId, tourName, loading: false });
  const handleCancelDelete = () => {
    if (deleteDialog.loading) return;
    setDeleteDialog({
      open: false,
      tourId: null,
      tourName: "",
      loading: false,
    });
  };
  const handleConfirmDelete = async () => {
    setDeleteDialog((p) => ({ ...p, loading: true }));
    try {
      await ApiDeleteTour(deleteDialog.tourId);
      setData((p) => p.filter((tour) => tour.tourID !== deleteDialog.tourId));
      setDeleteDialog({
        open: false,
        tourId: null,
        tourName: "",
        loading: false,
      });
      setSnackbar({
        open: true,
        message: "Xóa tour thành công!",
        severity: "success",
      });
    } catch {
      setDeleteDialog((p) => ({ ...p, loading: false }));
      setSnackbar({
        open: true,
        message: "Không thể xóa tour. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  const handleEdit = (tourId) => navigate(`/retrieve-tours/${tourId}`);
  const handleAddNew = () => navigate("/retrieve-tours/-1");

  const getAvailabilityChipSx = (available) => {
    const s = isDark
      ? AVAILABILITY_STYLE[available]
      : AVAILABILITY_STYLE_LIGHT[available];
    if (!s)
      return {
        fontWeight: "700",
        minWidth: "100px",
        height: "26px",
        fontSize: "12px",
      };
    return {
      fontWeight: "700",
      minWidth: "100px",
      height: "26px",
      fontSize: "12px",
      backgroundColor: s.bg,
      color: s.text,
      border: `1px solid ${s.border}`,
    };
  };

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return data;
    const kw = searchText.trim().toLowerCase();
    return data.filter(
      (item) =>
        item.title?.toLowerCase().includes(kw) ||
        item.tourCode?.toLowerCase().includes(kw) ||
        item.destination?.toLowerCase().includes(kw) ||
        item.departureLocation?.toLowerCase().includes(kw) ||
        String(item.tourID).includes(kw),
    );
  }, [data, searchText]);

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

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
        {/* Header */}
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
            Quản Lý Tours
          </Box>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* Search */}
            <TextField
              variant="outlined"
              placeholder="Tìm tên tour, mã, điểm đến..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && handleClearSearch()}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: searchText ? "primary.main" : "text.disabled",
                        fontSize: 20,
                        transition: "color 0.2s",
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: searchText ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={handleClearSearch}
                      sx={{
                        color: "text.disabled",
                        "&:hover": { color: "error.main" },
                        transition: "color 0.2s",
                      }}
                    >
                      <ClearIcon sx={{ fontSize: 17 }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              sx={{
                width: { xs: "100%", sm: "300px" },
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                  "& input": { pl: 0 },
                  "&.Mui-focused": {
                    boxShadow: "0px 4px 14px rgba(0,0,0,0.15)",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={handleAddNew}
              sx={{
                height: "40px",
                px: 3,
                backgroundColor: "success.main",
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "0px 3px 8px rgba(46,125,50,0.3)",
                "&:hover": {
                  backgroundColor: "success.dark",
                  boxShadow: "0px 5px 12px rgba(46,125,50,0.4)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Thêm Tour Mới
            </Button>
          </Box>
        </Box>

        {/* Search active badge */}
        {searchText.trim() && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1.5,
              px: 0.5,
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
              Tìm kiếm:
            </Typography>
            <Chip
              label={searchText.trim()}
              size="small"
              onDelete={handleClearSearch}
              deleteIcon={<ClearIcon />}
              sx={{
                fontWeight: "600",
                fontSize: "12px",
                backgroundColor: isDark ? "#1e3a5f" : "#e3f2fd",
                color: isDark ? "#60a5fa" : "#1565c0",
                border: isDark ? "1px solid #1e40af" : "1px solid #90caf9",
                "& .MuiChip-deleteIcon": {
                  color: isDark ? "#60a5fa" : "#1565c0",
                  fontSize: "16px",
                },
              }}
            />
            <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
              —{" "}
              <strong
                style={{ color: filteredData.length === 0 ? "red" : "inherit" }}
              >
                {filteredData.length}
              </strong>{" "}
              kết quả
            </Typography>
          </Box>
        )}

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
            <Button variant="outlined" onClick={handleGetManageTours}>
              Thử lại
            </Button>
          </Box>
        )}

        {!loading && !error && (
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
              borderRadius: 2,
              overflowX: "auto",
              width: "100%",
            }}
          >
            <Table sx={{ minWidth: 1600 }}>
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
                  <TableCell sx={{ minWidth: "100px" }}>Mã Tour</TableCell>
                  <TableCell sx={{ minWidth: "200px" }}>Tên Tour</TableCell>
                  <TableCell sx={{ minWidth: "130px" }}>Điểm đến</TableCell>
                  <TableCell sx={{ minWidth: "130px" }}>
                    Điểm khởi hành
                  </TableCell>
                  <TableCell sx={{ minWidth: "100px" }}>Thời gian</TableCell>
                  <TableCell sx={{ minWidth: "120px" }}>Phương tiện</TableCell>
                  <TableCell align="center" sx={{ minWidth: "90px" }}>
                    Số lượng
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: "130px" }}>
                    Giá người lớn
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: "130px" }}>
                    Giá trẻ em
                  </TableCell>
                  <TableCell sx={{ minWidth: "150px" }}>
                    Ngày khởi hành
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: "110px" }}>
                    Trạng thái
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: "140px" }}>
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={13} align="center" sx={{ py: 6 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <SearchIcon
                          sx={{ fontSize: 40, color: "text.disabled" }}
                        />
                        <Typography color="text.secondary" fontSize="14px">
                          {searchText
                            ? `Không tìm thấy kết quả cho "${searchText}"`
                            : "Không có dữ liệu"}
                        </Typography>
                        {searchText && (
                          <Button
                            size="small"
                            onClick={handleClearSearch}
                            startIcon={<ClearIcon />}
                          >
                            Xóa bộ lọc
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((tour, index) => (
                    <TableRow
                      key={tour.tourID}
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
                        #{tour.tourID}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                          color: "secondary.main",
                        }}
                      >
                        {highlight(tour.tourCode, searchText) || "-"}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "600",
                          color: "text.primary",
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {highlight(tour.title, searchText)}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap", color: "text.primary" }}
                      >
                        {highlight(tour.destination, searchText) || "-"}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap", color: "text.primary" }}
                      >
                        {highlight(tour.departureLocation, searchText) || "-"}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap", color: "text.primary" }}
                      >
                        {tour.duration || "-"}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap", color: "text.primary" }}
                      >
                        {tour.transportation || "-"}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={tour.quantity || 0}
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
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: "700",
                          color: t.priceColor,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatCurrency(tour.priceAdult)}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: "700",
                          color: t.priceColor,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatCurrency(tour.priceChild)}
                      </TableCell>
                      <TableCell
                        sx={{ color: "text.primary", maxWidth: "150px" }}
                      >
                        {tour.startDates && tour.startDates.length > 0 ? (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {tour.startDates.slice(0, 2).map((dateObj, idx) => (
                              <Chip
                                key={idx}
                                label={formatDate(dateObj.startDate)}
                                size="small"
                                sx={{
                                  height: "22px",
                                  fontSize: "11px",
                                  backgroundColor: isDark
                                    ? "#1e3a5f"
                                    : "#e3f2fd",
                                  color: isDark ? "#60a5fa" : "#1565c0",
                                  border: isDark
                                    ? "1px solid #1e40af"
                                    : "1px solid #90caf9",
                                }}
                              />
                            ))}
                            {tour.startDates.length > 2 && (
                              <Chip
                                label={`+${tour.startDates.length - 2}`}
                                size="small"
                                sx={{
                                  height: "22px",
                                  fontSize: "11px",
                                  backgroundColor: isDark
                                    ? "#422006"
                                    : "#fff3e0",
                                  color: isDark ? "#fbbf24" : "#e65100",
                                  border: isDark
                                    ? "1px solid #78350f"
                                    : "1px solid #ffb74d",
                                }}
                              />
                            )}
                          </Box>
                        ) : (
                          <Typography
                            sx={{ fontSize: "12px", color: "text.secondary" }}
                          >
                            Chưa có lịch
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={
                            tour.availability ? (
                              <CheckCircleIcon
                                sx={{ fontSize: "16px !important" }}
                              />
                            ) : (
                              <CancelIcon
                                sx={{ fontSize: "16px !important" }}
                              />
                            )
                          }
                          label={tour.availability ? "Còn chỗ" : "Hết chỗ"}
                          size="small"
                          sx={getAvailabilityChipSx(tour.availability)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            justifyContent: "center",
                          }}
                        >
                          <Tooltip title="Chỉnh sửa" arrow>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(tour.tourID)}
                              sx={{
                                backgroundColor: "warning.main",
                                color: "white",
                                width: "32px",
                                height: "32px",
                                "&:hover": {
                                  backgroundColor: "warning.dark",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <EditIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa" arrow>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDelete(tour.tourID, tour.title)
                              }
                              sx={{
                                backgroundColor: "error.main",
                                color: "white",
                                width: "32px",
                                height: "32px",
                                "&:hover": {
                                  backgroundColor: "error.dark",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Footer */}
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
              boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box sx={{ color: t.footerText, fontSize: "13px" }}>
              Tổng số tours:{" "}
              <strong style={{ color: theme.palette.text.primary }}>
                {data.length}
              </strong>
            </Box>
            <Box sx={{ color: t.footerText, fontSize: "13px" }}>
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

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "error.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <WarningAmberIcon sx={{ color: "error.main", fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", lineHeight: 1.2 }}
            >
              Xác nhận xóa tour
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Hành động này không thể hoàn tác
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <Typography sx={{ color: "text.secondary", fontSize: "14px" }}>
            Bạn có chắc chắn muốn xóa tour:
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              color: "text.primary",
              fontSize: "14px",
              mt: 0.5,
              p: 1.5,
              backgroundColor: "action.hover",
              borderRadius: 1,
              borderLeft: "3px solid",
              borderLeftColor: "error.main",
            }}
          >
            {deleteDialog.tourName}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "13px", mt: 1 }}>
            Tour sẽ bị ẩn khỏi hệ thống (chuyển về trạng thái không khả dụng).
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            onClick={handleCancelDelete}
            disabled={deleteDialog.loading}
            variant="outlined"
            sx={{
              flex: 1,
              textTransform: "none",
              fontWeight: "600",
              borderRadius: 2,
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={deleteDialog.loading}
            variant="contained"
            color="error"
            startIcon={
              deleteDialog.loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <DeleteIcon />
              )
            }
            sx={{
              flex: 1,
              textTransform: "none",
              fontWeight: "600",
              borderRadius: 2,
            }}
          >
            {deleteDialog.loading ? "Đang xóa..." : "Xóa tour"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ManageTours;

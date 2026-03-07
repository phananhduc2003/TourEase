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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useTheme } from "@mui/material/styles";
import { ApiGetManageUsers } from "../../../api/admin/ApiGetManageUsers";
import { ApiDeleteUser } from "../../../api/admin/ApiDeleteUser";
import { ApiToggleBlockUser } from "../../../api/admin/ApiToggleBlockUser";
import { useEffect, useState, useMemo } from "react";

const ROLE_LABEL = {
  USER: "Người dùng",
  ADMIN: "Quản trị viên",
};

const USER_STATUS_LABEL = {
  D: "Bình thường",
  B: "Bị chặn",
};

const PROVIDER_LABEL = {
  LOCAL: "Hệ thống",
  GOOGLE: "Google",
  FACEBOOK: "Facebook",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Dark mode styles
const ROLE_STYLE = {
  ADMIN: { bg: "#1e293b", text: "#818cf8", border: "#4c1d95" },
  USER: { bg: "#0c2a3a", text: "#38bdf8", border: "#0c4a6e" },
};

const ROLE_STYLE_LIGHT = {
  ADMIN: { bg: "#e0e7ff", text: "#4c1d95", border: "#c7d2fe" },
  USER: { bg: "#e0f2fe", text: "#075985", border: "#bae6fd" },
};

const USER_STATUS_STYLE = {
  D: { bg: "#0d3321", text: "#4ade80", border: "#166534" },
  B: { bg: "#3a0a0a", text: "#f87171", border: "#7f1d1d" },
};

const USER_STATUS_STYLE_LIGHT = {
  D: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
  B: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
};

// ── Confirm Dialog Component ───────────────────────────────────────────────────
function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  confirmColor,
  loading,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          minWidth: "360px",
          boxShadow: "0px 20px 60px rgba(0,0,0,0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontWeight: "700",
          fontSize: "16px",
          pb: 1,
        }}
      >
        <WarningAmberIcon
          sx={{
            color: confirmColor === "error" ? "#ef4444" : "#f59e0b",
            fontSize: "22px",
          }}
        />
        {title}
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <DialogContentText sx={{ fontSize: "14px", color: "text.secondary" }}>
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: "600",
            borderRadius: 2,
            minWidth: "80px",
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color={confirmColor}
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: "600",
            borderRadius: 2,
            minWidth: "80px",
          }}
        >
          {loading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            confirmLabel
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
function ManageUsers() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const t = theme.palette.table;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Dialog state
  const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null });
  const [blockDialog, setBlockDialog] = useState({ open: false, user: null });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    handleGetManageUsers();
  }, []);

  const handleGetManageUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiGetManageUsers();
      setData(response.data);
    } catch (err) {
      console.error("Error fetching manage users:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const openDeleteDialog = (user) => {
    setDeleteDialog({ open: true, user });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.user) return;
    setActionLoading(true);
    try {
      await ApiDeleteUser(deleteDialog.user.userID);
      setData((prev) =>
        prev.filter((u) => u.userID !== deleteDialog.user.userID),
      );
      setDeleteDialog({ open: false, user: null });
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // ── Block / Unblock ─────────────────────────────────────────────────────────
  const openBlockDialog = (user) => {
    setBlockDialog({ open: true, user });
  };

  const handleBlockConfirm = async () => {
    if (!blockDialog.user) return;
    const targetUser = blockDialog.user;
    const newStatus = targetUser.status === "B" ? "D" : "B";
    setActionLoading(true);
    try {
      await ApiToggleBlockUser(targetUser.userID, newStatus);
      setData((prev) =>
        prev.map((u) =>
          u.userID === targetUser.userID ? { ...u, status: newStatus } : u,
        ),
      );
      setBlockDialog({ open: false, user: null });
    } catch (err) {
      console.error("Error toggling block user:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // ── Filter ──────────────────────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    if (!searchText.trim()) return data;
    const keyword = searchText.toLowerCase();
    return data.filter(
      (item) =>
        item.fullName?.toLowerCase().includes(keyword) ||
        item.userName?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword) ||
        item.phoneNumber?.includes(keyword) ||
        String(item.userID).includes(keyword),
    );
  }, [data, searchText]);

  // ── Chip styles ─────────────────────────────────────────────────────────────
  const getRoleChipSx = (role) => {
    const s = isDark ? ROLE_STYLE[role] : ROLE_STYLE_LIGHT[role];
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

  const getUserStatusChipSx = (status) => {
    const s = isDark
      ? USER_STATUS_STYLE[status]
      : USER_STATUS_STYLE_LIGHT[status];
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

  // ── Render ──────────────────────────────────────────────────────────────────
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
          Quản Lý Người Dùng
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
          <Button variant="outlined" onClick={handleGetManageUsers}>
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
                <TableCell sx={{ minWidth: "150px" }}>Họ tên</TableCell>
                <TableCell sx={{ minWidth: "120px" }}>Tên đăng nhập</TableCell>
                <TableCell sx={{ minWidth: "180px" }}>Email</TableCell>
                <TableCell sx={{ minWidth: "120px" }}>Số ĐT</TableCell>
                <TableCell sx={{ minWidth: "100px" }}>Vai trò</TableCell>
                <TableCell align="center" sx={{ minWidth: "110px" }}>
                  Trạng thái
                </TableCell>
                <TableCell sx={{ minWidth: "120px" }}>Nhà cung cấp</TableCell>
                <TableCell sx={{ minWidth: "110px" }}>Ngày tạo</TableCell>
                <TableCell align="center" sx={{ minWidth: "170px" }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    align="center"
                    sx={{ py: 5, color: "text.secondary" }}
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((user, index) => (
                  <TableRow
                    key={user.userID}
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
                      #{user.userID}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        color: "text.primary",
                      }}
                    >
                      {user.fullName || "-"}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        color: "text.primary",
                      }}
                    >
                      {user.userName}
                    </TableCell>

                    <TableCell sx={{ color: t.emailColor }}>
                      {user.email}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                        color: "text.primary",
                      }}
                    >
                      {user.phoneNumber || "-"}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={ROLE_LABEL[user.role] ?? user.role}
                        size="small"
                        sx={getRoleChipSx(user.role)}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={USER_STATUS_LABEL[user.status] ?? user.status}
                        size="small"
                        sx={getUserStatusChipSx(user.status)}
                      />
                    </TableCell>

                    <TableCell
                      sx={{ whiteSpace: "nowrap", color: "text.primary" }}
                    >
                      {PROVIDER_LABEL[user.provider] ?? user.provider ?? "-"}
                    </TableCell>

                    <TableCell
                      sx={{ whiteSpace: "nowrap", color: "text.primary" }}
                    >
                      {formatDate(user.createDate)}
                    </TableCell>

                    {/* ── Action Buttons ── */}
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        {/* Block / Unblock */}
                        <Button
                          variant="contained"
                          size="small"
                          disabled={user.role === "ADMIN"}
                          onClick={() => openBlockDialog(user)}
                          startIcon={
                            user.status === "B" ? (
                              <LockOpenIcon sx={{ fontSize: "15px" }} />
                            ) : (
                              <BlockIcon sx={{ fontSize: "15px" }} />
                            )
                          }
                          sx={{
                            minWidth: "85px",
                            textTransform: "none",
                            fontWeight: "600",
                            fontSize: "12px",
                            py: 0.5,
                            whiteSpace: "nowrap",
                            backgroundColor:
                              user.status === "B"
                                ? isDark
                                  ? "#1a3a2a"
                                  : "#dcfce7"
                                : isDark
                                  ? "#3a2800"
                                  : "#fef3c7",
                            color:
                              user.status === "B"
                                ? isDark
                                  ? "#4ade80"
                                  : "#166534"
                                : isDark
                                  ? "#fbbf24"
                                  : "#92400e",
                            border: `1px solid ${
                              user.status === "B"
                                ? isDark
                                  ? "#166534"
                                  : "#bbf7d0"
                                : isDark
                                  ? "#78350f"
                                  : "#fde68a"
                            }`,
                            boxShadow: "none",
                            "&:hover": {
                              boxShadow: "0px 2px 6px rgba(0,0,0,0.12)",
                              backgroundColor:
                                user.status === "B"
                                  ? isDark
                                    ? "#22472e"
                                    : "#bbf7d0"
                                  : isDark
                                    ? "#4a3500"
                                    : "#fde68a",
                            },
                            "&.Mui-disabled": {
                              opacity: 0.35,
                            },
                          }}
                        >
                          {user.status === "B" ? "Bỏ chặn" : "Chặn"}
                        </Button>

                        {/* Delete */}
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          disabled={user.role === "ADMIN"}
                          onClick={() => openDeleteDialog(user)}
                          startIcon={<DeleteIcon sx={{ fontSize: "15px" }} />}
                          sx={{
                            minWidth: "70px",
                            textTransform: "none",
                            fontWeight: "600",
                            fontSize: "12px",
                            py: 0.5,
                            whiteSpace: "nowrap",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            "&:hover": {
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                            },
                            "&.Mui-disabled": {
                              opacity: 0.35,
                            },
                          }}
                        >
                          Xóa
                        </Button>
                      </Box>
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
            Tổng số người dùng:{" "}
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

      {/* ── Delete Confirm Dialog ── */}
      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() =>
          !actionLoading && setDeleteDialog({ open: false, user: null })
        }
        onConfirm={handleDeleteConfirm}
        loading={actionLoading}
        confirmColor="error"
        confirmLabel="Xóa"
        title="Xác nhận xóa người dùng"
        description={
          deleteDialog.user
            ? `Bạn có chắc muốn xóa tài khoản "${deleteDialog.user.fullName || deleteDialog.user.userName}" không? Hành động này không thể hoàn tác.`
            : ""
        }
      />

      {/* ── Block / Unblock Confirm Dialog ── */}
      <ConfirmDialog
        open={blockDialog.open}
        onClose={() =>
          !actionLoading && setBlockDialog({ open: false, user: null })
        }
        onConfirm={handleBlockConfirm}
        loading={actionLoading}
        confirmColor={blockDialog.user?.status === "B" ? "success" : "warning"}
        confirmLabel={blockDialog.user?.status === "B" ? "Bỏ chặn" : "Chặn"}
        title={
          blockDialog.user?.status === "B"
            ? "Xác nhận bỏ chặn người dùng"
            : "Xác nhận chặn người dùng"
        }
        description={
          blockDialog.user
            ? blockDialog.user.status === "B"
              ? `Bạn có muốn bỏ chặn tài khoản "${blockDialog.user.fullName || blockDialog.user.userName}"? Người dùng sẽ có thể đăng nhập lại.`
              : `Bạn có muốn chặn tài khoản "${blockDialog.user.fullName || blockDialog.user.userName}"? Người dùng sẽ không thể đăng nhập.`
            : ""
        }
      />
    </Box>
  );
}

export default ManageUsers;

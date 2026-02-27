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
import { ApiGetManageUsers } from "../../../api/admin/ApiGetManageUsers";
import { useEffect, useState, useMemo } from "react";

const ROLE_LABEL = {
  USER: "Người dùng",
  ADMIN: "Quản trị viên",
};

const ACTIVE_STATUS_LABEL = {
  Y: "Hoạt động",
  N: "Không hoạt động",
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

const ACTIVE_STATUS_STYLE = {
  Y: { bg: "#0d3321", text: "#4ade80", border: "#166534" },
  N: { bg: "#3a0a0a", text: "#f87171", border: "#7f1d1d" },
};

const ACTIVE_STATUS_STYLE_LIGHT = {
  Y: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
  N: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
};

const USER_STATUS_STYLE = {
  D: { bg: "#0d3321", text: "#4ade80", border: "#166534" },
  B: { bg: "#3a0a0a", text: "#f87171", border: "#7f1d1d" },
};

const USER_STATUS_STYLE_LIGHT = {
  D: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
  B: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
};

function ManageUsers() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const t = theme.palette.table;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

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

  const getActiveChipSx = (status) => {
    const s = isDark
      ? ACTIVE_STATUS_STYLE[status]
      : ACTIVE_STATUS_STYLE_LIGHT[status];
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
                  Hoạt động
                </TableCell>
                <TableCell align="center" sx={{ minWidth: "110px" }}>
                  Trạng thái
                </TableCell>
                <TableCell sx={{ minWidth: "120px" }}>Nhà cung cấp</TableCell>
                <TableCell sx={{ minWidth: "110px" }}>Ngày tạo</TableCell>
                <TableCell align="center" sx={{ minWidth: "120px" }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={11}
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
                        label={
                          ACTIVE_STATUS_LABEL[user.isActive] ?? user.isActive
                        }
                        size="small"
                        sx={getActiveChipSx(user.isActive)}
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

                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          startIcon={<EditIcon sx={{ fontSize: "16px" }} />}
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
                          }}
                        >
                          Sửa
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
    </Box>
  );
}

export default ManageUsers;

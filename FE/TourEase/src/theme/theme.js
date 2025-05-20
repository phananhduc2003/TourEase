import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = extendTheme({
  //   customHeader: {
  //     textTitle: "18px",
  //   },

  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          light: "#64b5f6", // Màu xanh nước biển sáng
          main: "#2196f3", // Màu chính xanh nước biển
          dark: "#1976d2", // Màu xanh nước biển đậm
          contrastText: "#ffffff", // Chữ trắng trên nút xanh
        },
        text: {
          primary: "#0F1214", // Chữ chính màu đen
          secondary: "#6C7C93", // Chữ phụ màu đen xám
        },

        background: {
          default: "#f5f5f5", // Nền sáng nhẹ
          paper: "#e0e0e0",
        },
        secondary: {
          light: "#ffcc80", // Cam sáng
          main: "#ffa726", // Cam chính
          dark: "#ef6c00", // Cam đậm
          contrastText: "#ffffff", // Chữ trắng
        },
      },
    },
    dark: {
      mode: "dark",
      palette: {
        primary: {
          light: "#42a5f5",
          main: "#1e88e5",
          dark: "#1565c0",
          contrastText: "#ffffff",
        },
        text: {
          primary: "#ffffff",
          secondary: "#B6BEC9",
        },
        background: {
          default: "#121212", // Nền tối
          paper: "#373A40", // Nền giấy tối
        },
        secondary: {
          light: "#ffcc80",
          main: "#ffa726",
          dark: "#ef6c00",
          contrastText: "#ffffff",
        },
      },
    },
  },
  // ...other properties
});

export default theme;

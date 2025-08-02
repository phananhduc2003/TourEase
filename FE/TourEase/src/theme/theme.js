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
          light: "#ffcc80", // Cam sáng
          main: "#ef6c00", // Cam chính
          dark: "#ffa726", // Cam đậm
          contrastText: "#ffffff", // Chữ trắng trên nút xanh
        },
        text: {
          primary: "#0F1214", // Chữ chính màu đen
          secondary: "#6C7C93", // Chữ phụ màu đen xám
          second: "#E4E4E4",
          // Chữ đen
        },

        background: {
          default: "#f5f5f5", // Nền sáng nhẹ
          paper: "#e0e0e0",
          second: "#373A40",
        },
        secondary: {
          light: "#3674B5", // Màu xanh nước biển sáng
          main: "#578FCA", // Màu chính xanh nước biển
          dark: "#1976d2", // Màu xanh nước biển đậm
          contrastText: "#ffffff", // Chữ trắng
        },
      },
    },
    dark: {
      mode: "dark",
      palette: {
        primary: {
          light: "#2d3a3a   ",
          main: " #2ba84a ",
          dark: "#B39CD0 ",
          contrastText: "#ffffff",
        },
        text: {
          primary: "#E4E4E4",
          secondary: "#B6BEC9",
          second: "#0F1214",
        },
        background: {
          default: "#2C2C2C ", // Nền tối
          paper: "#373A40", // Nền giấy tối
          second: "#e0e0e0",
        },
        secondary: {
          light: "#444444 ",
          main: "#B0B0B0 ",
          dark: "#B0B0B0",
          contrastText: "#ffffff",
        },
      },
    },
  },
  // ...other properties
});

export default theme;

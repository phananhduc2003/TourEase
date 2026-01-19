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
          contrastText: "#2ba84a", // Chữ trắng trên nút xanh
        },
        text: {
          primary: "#0F1214", // Chữ chính màu đen
          secondary: "#4B5A73", // Chữ phụ màu đen xám
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
          dark: "#1976d2",
          contrastText: "#ffffff",
        },
        sidebar: {
          menu: "#FFEFD7",
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
          contrastText: "#ef6c00",
        },
        text: {
          primary: "#E4E4E4",
          secondary: "#B6BEC9",
          second: "#0F1214",
        },
        background: {
          default: "#2C2C2C ",
          paper: "#444444",
          second: "#e0e0e0",
        },
        secondary: {
          light: "#373A40 ",
          main: "#B0B0B0 ",
          dark: "#B0B0B0",
          contrastText: "#ffffff",
        },
        sidebar: {
          menu: "#B0B0B0",
        },
      },
    },
  },
  // ...other properties
});

export default theme;

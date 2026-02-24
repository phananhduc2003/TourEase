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
        table: {
          header: "#1976d2", // Nền header
          headerText: "#ffffff", // Chữ header
          headerBorder: "#115293", // Border dưới header
          rowOdd: "#fafafa", // Hàng lẻ
          rowEven: "#ffffff", // Hàng chẵn
          rowHover: "#f0f7ff", // Hover
          rowBorder: "#e0e0e0", // Border giữa các hàng
          idColor: "#1976d2", // Màu cột Mã #31
          emailColor: "#666666", // Màu email
          priceColor: "#d32f2f", // Màu tổng tiền
          adultChipBg: "#e3f2fd", // Chip người lớn - nền
          adultChipText: "#1976d2", // Chip người lớn - chữ
          childChipBg: "#fff3e0", // Chip trẻ em - nền
          childChipText: "#f57c00", // Chip trẻ em - chữ
          footerBg: "#ffffff", // Nền footer tổng kết
          footerText: "#666666", // Chữ footer
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

        table: {
          header: "#0d1f35", // Nền header navy rất đậm
          headerText: "#7ec8e3", // Chữ header xanh sky nhạt
          headerBorder: "#0288d1", // Border dưới header xanh dương
          rowOdd: "#162032", // Hàng lẻ navy đậm
          rowEven: "#1a2744", // Hàng chẵn navy nhạt hơn
          rowHover: "#1e3a5f", // Hover xanh navy sáng
          rowBorder: "#1e2d42", // Border mờ giữa các hàng
          idColor: "#38bdf8", // Màu cột Mã - xanh sky
          emailColor: "#8fa3bc", // Màu email - xanh xám
          priceColor: "#f87171", // Màu tổng tiền - đỏ nhạt
          adultChipBg: "#0c2a3a", // Chip người lớn - nền navy
          adultChipText: "#38bdf8", // Chip người lớn - chữ sky
          childChipBg: "#2d1a00", // Chip trẻ em - nền nâu đậm
          childChipText: "#fb923c", // Chip trẻ em - chữ cam
          footerBg: "#162032", // Nền footer
          footerText: "#8fa3bc", // Chữ footer
        },
      },
    },
  },
  // ...other properties
});

export default theme;

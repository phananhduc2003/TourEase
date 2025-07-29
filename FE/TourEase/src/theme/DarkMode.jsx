import { useColorScheme, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkMode";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 54, // Width of the switch
  height: 36,
  padding: 7,
  position: "relative",
  "& .MuiSwitch-switchBase": {
    transform: "translateY(-2px)",
    "&.Mui-checked": {
      transform: " translateY(-2px) translateX(16px)", // Move thumb when "checked"
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? "background.default"
            : "background.default",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "background.default"
        : "background.default",
    width: 26,
    height: 26,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .icon": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#ef6c00",
    borderRadius: 20,
  },
}));

function DarkMode() {
  const { mode, setMode } = useColorScheme();

  const handleChangeMode = (event) => {
    const newMode = event.target.checked ? "dark" : "light";
    setMode(newMode);
  };

  return (
    <CustomSwitch
      checked={mode === "dark"}
      onChange={handleChangeMode}
      icon={
        <LightModeIcon
          className="icon"
          style={{ color: "#FFD700", fontSize: 20 }} // Brighter yellow color
        />
      }
      checkedIcon={
        <DarkModeOutlinedIcon
          className="icon"
          style={{ color: "#ffffff", fontSize: 20 }} // Adjust size if necessary
        />
      }
    />
  );
}

export default DarkMode;

import { createTheme, ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    secondary: {
      main: "#DADBBD",
    },
    primary: {
      main: "#151D3B",
    },
    error: {
      main: "#D82148",
    },
    success: {
      main: "#6EBF8B",
    },
    // background: {
    //   default: "#ff0000",
    // },
  },
  typography: {
    allVariants: {
      fontFamily: "Solway",
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;

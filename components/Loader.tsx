import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: grey[200],
      }}
    >
      <CircularProgress color={"primary"} size={300}></CircularProgress>
    </Box>
  );
};

export default Loader;

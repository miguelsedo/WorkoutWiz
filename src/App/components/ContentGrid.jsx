import { Grid } from "@mui/material";

const ContentGrid = ({ children, width, marginTop }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        mt: marginTop !== undefined ? marginTop : 2, // Use the provided marginTop if available, otherwise default to 2
        width: width || '50%', // Make the grid span the whole width or use the provided width
        padding: 3,
        borderRadius: 2,
        display: 'flex', // Set display to flex
        flexDirection: 'column', // Align items vertically
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
      }}
    >
      {children}
    </Grid>
  );
};

export default ContentGrid;

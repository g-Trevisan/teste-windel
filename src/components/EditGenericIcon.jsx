import EditIcon from '@mui/icons-material/Edit';

export const EditGenericIcon = () => {
  return (
    <>
      <EditIcon
        color='primary'
        sx={{
          // color: "#aaabb3",
          cursor: "pointer",
          "&:hover": {
            // color: "#68b366",
            transform: "scale(1.1)",
          },
        }}
      />
    </>
  );
};
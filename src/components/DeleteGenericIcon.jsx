import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteGenericIcon = () => {
  return (
    <>
      <DeleteIcon
        sx={{
          color: "#ad2d31",
          cursor: "pointer",
          "&:hover": {
            color: "#ff0009",
            transform: "scale(1.1)",
          },
        }}
      />
    </>
  )
}

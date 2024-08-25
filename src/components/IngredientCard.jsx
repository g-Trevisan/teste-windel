import { Box, TextField, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const IngredientCard= ({ingredient, index, onIngredientChange, onRemoveIngredient}) => {
  return (
    <Box key={index} sx={{ display: "flex", gap: 2, marginBottom: 2, pt: "6px" }}>
    <TextField
      label="Nome do Ingrediente"
      name="name"
      value={ingredient.name}
      onChange={(e) => onIngredientChange(index, e)}
      variant="outlined"
      required
      fullWidth
      // sx={{mt:"1rem"}}
    />
    <TextField
      label="Quantidade"
      name="quantity"
      value={ingredient.quantity}
      type="number"
      // inputProps={{ min: 0 }}
      onChange={(e) => {
        const value = parseFloat(e.target.value);
        value >= 0 ? onIngredientChange(index, e) : null;
      }}
      variant="outlined"
      fullWidth
    />
    <IconButton
      disableRipple
      onClick={() => onRemoveIngredient(index)}
    >
      <ClearIcon sx={{ color: "red" }} />
    </IconButton>
  </Box>
  )
}

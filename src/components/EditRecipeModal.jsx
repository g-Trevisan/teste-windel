import { Box, Modal } from "@mui/material";
import { FormRecipe } from "./FormRecipe"; // Importando o FormRecipe

export function EditRecipeModal({ open, onClose, recipe, refreshRecipes }) {
  return (
    <Modal
      sx={{ height: "60vh" }}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          overflowY: "auto",
          padding: 2,
          minWidth: { xs: 300, sm: 400, md: 500, lg: 600, xl: 700 },
          maxWidth: { xs: 350, sm: 500, md: 600, lg: 700, xl: 800 },
          margin: "auto",
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <FormRecipe
          sx={{
            overflowY: "auto",
          }}
          recipe={recipe}
          onClose={onClose}
          refreshRecipes={refreshRecipes}
        />
      </Box>
    </Modal>
  );
}
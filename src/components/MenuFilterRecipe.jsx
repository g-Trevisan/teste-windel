import {
  Box,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";

import { Star, StarBorder } from "@mui/icons-material";

export const MenuFilterRecipe = ({
  filters,
  setFilters,
  recipes,
  handleSelectAll,
  handleOpenModal,
  DeleteGenericIcon,
  selectedRecipes,
  filteredRecipes,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        maxHeight: "4rem",
        mx: {xs: "1.6rem", sm: "2rem", ms: "3.2rem",},
        //borderRadius:"6px",
        //background: "background.paper",
        //boxShadow:"6"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        <TextField
          label="Nome"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          variant="outlined"
          size="small"
          sx={{
            flex: 1,
            minWidth: "6rem",
            maxWidth: "14rem",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background.paper", // Aplica o fundo no componente interno
              boxShadow: "4",
            },
          }}
        />
        <TextField
          label="Categoria"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          variant="outlined"
          select
          size="small"
          sx={{
            flex: 1,
            minWidth: "7rem",
            maxWidth: "14rem",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background.paper", // aplica o fundo no componente interno
              boxShadow: "4",
              display: {
                xs: "none",
                sm: "block",
              },
            },
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <MenuItem value="">Todos</MenuItem>
          {recipes.map((recipe) => (
            <MenuItem key={recipe.id} value={recipe.category}>
              {recipe.category}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={
            <IconButton
              disableRipple
              onClick={() =>
                setFilters({ ...filters, isFavorite: !filters.isFavorite })
              }
              color="primary"
            >
              {filters.isFavorite ? <Star /> : <StarBorder />}
            </IconButton>
          }
          label="Favorito"
          sx={{
            flex: 0.5,
            minWidth: "6.2rem",
            color: "black",
            userSelect: "none",
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          minWidth: "12rem",
        }}
      >
        <Button sx={{minWidth:"10.6rem"}} onClick={handleSelectAll} variant="contained">
          {selectedRecipes.length === filteredRecipes.length
            ? "Desmarcar todos"
            : "Selecionar Todos"}
        </Button>
        <Button
          onClick={handleOpenModal}
          variant="contained"
          color="error"
          disabled={selectedRecipes.length < 1}
          // endIcon={<DeleteGenericIcon />}
        >
          Deletar
        </Button>
      </Box>
    </Box>
  );
};

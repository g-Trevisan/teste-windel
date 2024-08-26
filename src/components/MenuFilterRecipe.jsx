import {
  Box,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

export const MenuFilterRecipe = ({
  filters,
  setFilters,
  recipes,
  handleSelectAll,
  handleOpenModal,
  DeleteGenericIcon,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        maxHeight: "4rem",
        px: "1rem",
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
            minWidth: "6rem",
            maxWidth: "14rem",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background.paper", // Aplica o fundo no componente interno
            },
          }}
        >
          <MenuItem value="">Todos</MenuItem>
          {recipes.map((recipe) => (
            <MenuItem key={recipe.id} value={recipe.category}>
              {recipe.category}
            </MenuItem>
          ))}
          <MenuItem value="Sobremesa">Sobremesa</MenuItem>
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.isFavorite}
              onChange={(e) =>
                setFilters({ ...filters, isFavorite: e.target.checked })
              }
            />
          }
          label="Favorito"
          sx={{ flex: 0.5, minWidth: "6rem", color:"black" }}
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
        <Button onClick={handleSelectAll} variant="contained">
          Selecionar Todos
        </Button>
        <Button
          onClick={handleOpenModal}
          variant="contained"
          endIcon={<DeleteGenericIcon />}
        >
          Deletar
        </Button>
      </Box>
    </Box>
  );
};

import { useState, useEffect } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import {
  DeleteGenericIcon,
  RecipeCard,
  Loading,
  ModalConfirmDelete,
} from "../components/index";
import { recipeFetch } from "../axios/config";
import { NoRecipeMessage } from "../components/NoRecipeMessage";

export const ListRecipes = () => {
  const [recipes, setRecipes] = useState([]); //definindo e atualizando receitas
  const [selectedRecipes, setSelectedRecipes] = useState([]); //receitas selecionadas pela checkbox para posterior exclusao
  const [loading, setLoading] = useState(true); //
  const [openModal, setOpenModal] = useState(false); // estado para controlar o modal
  const [isMultiple, setIsMultiple] = useState(false); // estado para controlar se é exclusao multipla
  const [selectedName, setSelectedName] = useState(""); // nome da receita para exclusao unica

  const getRecipes = async () => {
    try {
      const response = await recipeFetch.get("/recipe");
      const data = response.data;
      setRecipes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecipe = (id) => {
    setSelectedRecipes((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((recipeId) => recipeId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRecipes.length === recipes.length) {
      setSelectedRecipes([]); //se todas estao marcadas, entao serao desmarcadas ao clciar no botao
    } else {
      setSelectedRecipes(recipes.map((recipe) => recipe.id)); //faz o map buscando o id, e preenche o array de receitas selecionadas
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRecipes.map((id) => recipeFetch.delete(`/recipe/${id}`))
      );
      setSelectedRecipes([]);
      handleCloseModal();
      getRecipes();
    } catch (error) {
      console.log("Ocorreu erro na funcao handleDeleteSelected", error);
    }
  };

  const handleOpenModal = (name, isMultiple) => {
    setSelectedName(name);
    setIsMultiple(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsMultiple(false);
    setSelectedName("");
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <Box>
      {/* se loading = true, retornará o componente Loading. Caso contrário, irá validar se existe receitas para mostrar, se recipes.length for menor que zero, mostrará o componente NoRecipeMessage */}
      {loading ? (
        <Loading />
      ) : recipes.length > 0 ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button onClick={handleSelectAll} variant="contained">
              Selecionar Todos
            </Button>
            <Button
              sx={{mr:1}}
              onClick={handleOpenModal}
              variant="contained"
              endIcon={<DeleteGenericIcon />}
            >
              Deletar
            </Button>
          </Box>
          <Grid container spacing={4} sx={{ px: 3, py: 2, paddingBottom: 10 }}>
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={recipe.id}>
                <RecipeCard
                  recipeId={recipe.id}
                  name={recipe.name}
                  description={recipe.description}
                  category={recipe.category}
                  isFavorite={recipe.isFavorite}
                  ingredients={recipe.ingredients}
                  refreshRecipes={getRecipes}
                  onSelectRecipe={handleSelectRecipe}
                  selectedRecipes={selectedRecipes}
                  isSelected={selectedRecipes.includes(recipe.id)}
                  handleOpenModal={handleOpenModal}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "white" }}>Paginação será aqui</Typography>
          </Box>
        </>
      ) : (
        <NoRecipeMessage />
      )}
      <ModalConfirmDelete
        open={openModal}
        handleClose={handleCloseModal}
        handleDelete={handleDeleteSelected}
        name={selectedName}
        multipleDelete={isMultiple}
      />
    </Box>
  );
};

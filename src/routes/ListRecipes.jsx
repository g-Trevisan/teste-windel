import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box
} from "@mui/material";
import {
  RecipeCard,
  Loading,
  ModalConfirmDelete,
  DeleteGenericIcon, 
  SnackbarAlert,
  MenuFilterRecipe
} from "../components/index";
import { recipeFetch } from "../axios/config";
import { NoRecipeMessage } from "../components/NoRecipeMessage";

export const ListRecipes = () => {
  const [recipes, setRecipes] = useState([]); //definindo e atualizando receitas
  const [selectedRecipes, setSelectedRecipes] = useState([]); //receitas selecionadas pela checkbox para posterior exclusao
  const [loading, setLoading] = useState(true); // estado de carregamento da página
  const [openModal, setOpenModal] = useState(false); // estado para controlar o modal
  const [isMultiple, setIsMultiple] = useState(false); // estado para controlar se é exclusao multipla
  const [selectedName, setSelectedName] = useState(""); // nome da receita para exclusao unica
  const [filteredRecipes, setFilteredRecipes] = useState([]); // dados filtrados
  const [searchTerm, setSearchTerm] = useState(""); // termo de busca

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
    if (selectedRecipes.length === filteredRecipes.length) {
      setSelectedRecipes([]); //se todas estao marcadas, entao serao desmarcadas ao clciar no botao
    } else {
      setSelectedRecipes(filteredRecipes.map((recipe) => recipe.id)); //faz o map buscando o id, e preenche o array de receitas selecionadas (alterado de recipes.map para filteredRecipes.map)
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
    if (selectedRecipes.length > 0) {
      setSelectedName(name);
      setIsMultiple(true);
      setOpenModal(true);
      console.log(selectedRecipes.length);
    } else {
      // exibir snackbar de erro caso nao tenha nenhuma receita selecionada
      setSnackbar({
        open: true,
        message: "Nenhuma receita selecionada...",
        severity: "error",
      });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsMultiple(false);
    setSelectedName("");
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  /////////// ------------------------------------------------- filtragem

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    isFavorite: false,
  });

  const handleSearch = async () => {
    try {
      const response = await recipeFetch.get("/recipes", {
        params: filters,
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = recipes;
  
      if (filters.name) { // filtrando pelo nome
        filtered = filtered.filter(recipe =>
          recipe.name.toLowerCase().includes(filters.name.toLowerCase()) //garante que todo o texto digitado fique em caixa baixa (sem caps)
        );
      }
  
      if (filters.category) { // filtrando pela categoria
        filtered = filtered.filter(recipe =>
          recipe.category === filters.category
        );
      }
  
      if (filters.isFavorite) { // filtrando pelos favoritos
        filtered = filtered.filter(recipe => recipe.isFavorite);
      }
  
      setFilteredRecipes(filtered);
    };
  
    applyFilters();
  }, [filters, recipes]); // executa o filtro sempre que os filtros ou receitas mudarem
  /////////// ------------------------------------------------- filtragem

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
          <MenuFilterRecipe
            filters={filters}
            setFilters={setFilters}
            recipes={recipes}
            handleSelectAll={handleSelectAll}
            handleOpenModal={handleOpenModal}
            DeleteGenericIcon={DeleteGenericIcon}
          />
         
          <Grid container spacing={4} sx={{ px: 3, py: 2, paddingBottom: 10 }}>
            {filteredRecipes.map((recipe) => ( //antes era chamado recipes.map, após adicionar filtro ficou assim
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
      <SnackbarAlert
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
};

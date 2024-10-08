import { useState, useEffect } from "react";
import { Grid, Typography, Box, Pagination } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  RecipeCard,
  Loading,
  ModalConfirmDelete,
  DeleteGenericIcon,
  SnackbarAlert,
  MenuFilterRecipe,
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

  const [page, setPage] = useState(1); //pagina inicial
  const [recipesPerPage] = useState(6); //qtdade itens por pagina

  const getRecipes = async () => {
    try {
      const response = await recipeFetch.get("/recipe");
      const data = response.data;
      setRecipes(data);
      // tratamento de erros http
    } catch (error) {
      let errorMessage = "Erro ao obter receitas. Tente novamente mais tarde.";
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Requisição inválida. Verifique os dados.";
            break;
          case 401:
            errorMessage = "Não autorizado. Verifique suas credenciais.";
            break;
          case 403:
            errorMessage = "Acesso proibido. Você não tem permissão.";
            break;
          case 404:
            errorMessage = "Receita não encontrada.";
            break;
          case 500:
            errorMessage = "Erro interno do servidor.";
            break;
          case 503:
            errorMessage = "Serviço temporariamente indisponível.";
            break;
          default:
            errorMessage = "Erro desconhecido.";
            break;
        }
      }
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
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

      if (filters.name) {
        // filtrando pelo nome
        filtered = filtered.filter(
          (recipe) =>
            recipe.name.toLowerCase().includes(filters.name.toLowerCase()) //garante que todo o texto digitado fique em caixa baixa (sem caps)
        );
      }

      if (filters.category) {
        // filtrando pela categoria
        filtered = filtered.filter(
          (recipe) => recipe.category === filters.category
        );
      }

      if (filters.isFavorite) {
        // filtrando pelos favoritos
        filtered = filtered.filter((recipe) => recipe.isFavorite);
      }

      setFilteredRecipes(filtered);
    };

    applyFilters();
  }, [filters, recipes]); // executa o filtro sempre que os filtros ou receitas mudarem
  /////////// ------------------------------------------------- filtragem

  /////////// ------------------------------------------------- paginaçao
  const handlePageChange = (event, value) => {
    //mudança de pagina
    setPage(value);
  };

  const paginatedRecipes = filteredRecipes.slice(
    (page - 1) * recipesPerPage,
    page * recipesPerPage
  );
  /////////// ------------------------------------------------- paginaçao

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
            selectedRecipes={selectedRecipes}
            filteredRecipes={filteredRecipes}
            handleSelectAll={handleSelectAll}
            handleOpenModal={handleOpenModal}
            DeleteGenericIcon={DeleteGenericIcon}
          />

          <Grid container spacing={4} sx={{ px: 3, py: 2, paddingBottom: 10 }}>
            {paginatedRecipes.map(
              (
                recipe //antes era chamado recipes.map, após filtro filteredRecipes.map, após paginaçao paginatedRecipes.map
              ) => (
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
              )
            )}
          </Grid>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={Math.ceil(filteredRecipes.length / recipesPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              variant="outlined"
              shape="rounded"
            />
            
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

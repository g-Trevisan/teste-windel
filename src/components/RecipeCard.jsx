import { useState } from "react";
import {Box,Card,CardContent,Typography,Divider,List,ListItem,ListItemText,Chip,IconButton,Modal,Button,Checkbox} from "@mui/material";
import { EditGenericIcon, DeleteGenericIcon } from "../components/index";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { recipeFetch } from "../axios/config";
import { ModalConfirmDelete } from "./ModalConfirmDelete";

export const RecipeCard = ({
  recipeId,
  name,
  description,
  isFavorite,
  category,
  ingredients,
  isSelected,
  onSelectRecipe,
  refreshRecipes,
  handleOpenModal
}) => {
  const [open, setOpen] = useState(false); // estado para controlar se o modal está aberto ou fechado

  // alterando o estado do modal conforme a funçao de abertura ou fechamento
  const handleOpen = () => setOpen(true); 
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      const url = `/recipe/${recipeId}`; //caminho para o delete da api
      //   console.log("teste exclusao url", url); adicionei pois estava ocorrendo um erro de onde estava puxando o id como undefined
      await recipeFetch.delete(url); //
      handleClose(); // fecha o modal de confirmaçao após a exclusão
      refreshRecipes(); // faz com que a página atualize após a exclusão para puxar os itens corretos
    } catch (error) {
      console.error(
        "Erro ao excluir a receita:", error
      );
    }
  };

  return (
    <Box sx={{}}>
      <Card
        key={recipeId}
        sx={{ height: "20rem", maxWidth: "34rem", margin: "auto" }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              // justifyContent: "center",
              // position: "relative",
            }}
          >
            <Typography
              variant="h5"
              // component="div"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center", flexGrow: 1 }}
            >
              {name}
            </Typography>
            {/* <IconButton disableRipple sx={{ position: "absolute", right: 0, top: -3 }}> */}
            {/* <MoreVertIcon sx={{ height: "1.25rem" }} /> */}
            <Checkbox
              checked={isSelected}
              onChange={() => onSelectRecipe(recipeId)}
              sx={{ marginBottom: 1 }}
            />
            {/* </IconButton> */}
          </Box>
          <Divider sx={{ marginY: 1 }} />
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {description}
          </Typography>
          <Divider sx={{ marginY: 1 }} />
          <Box>
            <Typography variant="h6" sx={{}}>
              Ingredientes
            </Typography>
            <Box
              sx={{
                height: "4rem",
                marginTop: "0",
                overflowY: "hidden", //esconde os demais itens que serão apresentados no scroll abaixo
                "&:hover": {
                  overflowY: "auto", //para exibir o scroll
                },
              }}
            >
              <List sx={{ p: 0, height: "4rem" }}>
                {ingredients.map((ingredient) => (
                  <ListItem key={ingredient.id} sx={{ mb: "-1.25rem" }}>
                    <ListItemText
                      primary={`Descrição - ${ingredient.name}`}
                      secondary={`Quantidade - ${ingredient.quantity}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          <Divider sx={{ marginY: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "0.25rem" }}>
              <Chip label={category} color="primary" />
              {isFavorite && <Chip label="Favorito" color="primary" />}
            </Box>
            <Box sx={{ display: "flex" }}>
              <IconButton disableRipple>
                <EditGenericIcon />
              </IconButton>
              <IconButton disableRipple onClick={handleOpen}>
                <DeleteGenericIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <ModalConfirmDelete
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        name={name}
      />
    </Box>
  );
};

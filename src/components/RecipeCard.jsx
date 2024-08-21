import { useState } from "react";
import {Box,Card,CardContent,Typography,Divider,List,ListItem,ListItemText,Chip,IconButton,Modal,Button,Checkbox} from "@mui/material";
import { EditGenericIcon, DeleteGenericIcon } from "../components/index";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { recipeFetch } from "../axios/config";

export const RecipeCard = ({
  recipeId,
  name,
  description,
  isFavorite,
  category,
  ingredients,
  refreshRecipes
  //onDelete, // Função a ser chamada após a exclusão
}) => {
  const [open, setOpen] = useState(false); // Estado para controlar o modal

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
      console.error("Erro ao excluir a receita:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <Box sx={{}}>
      <Card key={recipeId} sx={{height: "20rem", maxWidth:"34rem", margin: "auto" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent:"center",
              // justifyContent: "center",
              // position: "relative",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center", flexGrow: 1 }}
            >
              {name}
            </Typography>
            {/* <IconButton disableRipple sx={{ position: "absolute", right: 0, top: -3 }}> */}
              {/* <MoreVertIcon sx={{ height: "1.25rem" }} /> */}
              <Checkbox sx={{marginBottom:1}}/>
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
            <Box sx={{
                height: "4rem",
                marginTop:"0",
                overflowY: "hidden", //esconde os demais itens que serão apresentados no scroll abaixo
                '&:hover': {
                    overflowY: "auto", //para exibir o scroll
                },
                }}>
                <List sx={{p:0, height:"4rem"}}>
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

      {/* Modal de confirmação */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Confirmar Exclusão
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Você tem certeza que deseja excluir a receita "{name}"?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>
              Cancelar
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Excluir
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

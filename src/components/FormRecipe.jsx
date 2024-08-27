import React, { useEffect, useState } from "react";
import { recipeFetch } from "../axios/config";
import { IngredientCard, SnackbarAlert } from "./index.jsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

export function FormRecipe({ recipe, onClose, refreshRecipes }) {
  const [formData, setFormData] = useState({
    //dados da receita
    name: "",
    description: "",
    ingredients: [{ name: "", quantity: 0 }],
    category: "",
    isFavorite: false,
  });

  const [snackbar, setSnackbar] = useState({
    //estado do snackbar de aviso
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        description: recipe.description,
        ingredients: Array.isArray(recipe.ingredients)
          ? recipe.ingredients
          : [],
        // ingredients: recipe.description,
        // ingredients: [{ name: "", quantity: 0 }],
        category: recipe.category,
        isFavorite: recipe.isFavorite,
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = [...formData.ingredients];
    newIngredients[index][name] =
      name === "quantity" ? parseFloat(value) : value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    const lastIngredient =
      formData.ingredients[formData.ingredients.length - 1];

    if (lastIngredient.name.trim().length >= 1 && lastIngredient.quantity > 0) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, { name: "", quantity: 0 }],
      });
    } else {
      setSnackbar({
        open: true,
        message: "Revise as informações do último ingrediente adicionado",
        severity: "error",
      });
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isFavorite: e.target.checked });
  };

  const handleSendRecipe = async (e) => {
    e.preventDefault();
    try {
      const url = recipe ? `/recipe/${recipe.recipeId}` : "/recipe"; // se a receita já existir, entao chamará o put, caso contrário, cadastrará a nova com o post
      const method = recipe ? "patch" : "post"; // se a receita já existir, chamara o patch para editar dados
      const response = await recipeFetch[method](url, formData);
      console.log("Dados enviados com sucesso:", response.data);

      // exibir snackbar de sucesso
      setSnackbar({
        open: true,
        message: "Receita enviada com sucesso!",
        severity: "success",
      });

      // limpar os campos após o envio dos dados
      setFormData({
        name: "",
        description: "",
        ingredients: [{ name: "", quantity: 0 }],
        category: "",
        isFavorite: false,
      });
      {
        method == "patch" ? (onClose(), refreshRecipes()) : null;
      } // executa somente quando for chamado o modal que é direto na tela de consulta. Na tela de cadastro, não precisamos chamar essas funçÕes, por isso somente quando o method for de alteraçao "patch"
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);

      //exibir snackbar de erro
      setSnackbar({
        open: true,
        message: "Erro ao enviar a receita!",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Card
      sx={{
        minWidth: { xs: 300, sm: 400, md: 500, lg: 600, xl: 700 },
        maxWidth: { xs: 350, sm: 500, md: 600, lg: 700, xl: 800 },
        margin: "auto",
        boxShadow: 20,
        // background:"black",
      }}
    >
      <CardContent>
        <form onSubmit={handleSendRecipe}>
          <Typography variant="h6" component="div" gutterBottom>
            {recipe ? "Editar Receita" : "Cadastrar Receita"}
          </Typography>
          <TextField
            fullWidth
            label="Nome da Receita"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
            required
            sx={{ marginBottom: 2 }}
          />
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" sx={{ marginBottom: 2, color: "#707070" }}>
            Ingredientes
          </Typography>
          <Box sx={{ maxHeight: "20vh", overflowY: "auto" }}>
            {formData.ingredients.map((ingredient, index) => (
              <IngredientCard
                key={index}
                ingredient={ingredient}
                index={index}
                onIngredientChange={handleIngredientChange}
                onRemoveIngredient={handleRemoveIngredient}
              />
            ))}
          </Box>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddIngredient}
            sx={{ marginBottom: 2 }}
          >
            Adicionar Ingrediente
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <TextField
            fullWidth
            label="Categoria"
            name="category"
            value={formData.category}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Checkbox
              checked={formData.isFavorite}
              onChange={handleCheckboxChange}
              name="isFavorite"
            />
            <Typography sx={{ color: "#707070" }}>Favorito</Typography>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Salvar Receita
          </Button>
        </form>
      </CardContent>
      <SnackbarAlert
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Card>
  );
}

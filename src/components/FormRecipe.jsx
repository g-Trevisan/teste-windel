import React, { useState } from "react";
import { recipeFetch } from "../axios/config";
import { SnackbarAlert } from "./index.jsx";
import {Box,Button,Card,CardContent,Checkbox,Divider,TextField,Typography,IconButton} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

export function FormRecipe() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: [{ name: "", quantity: 0 }],
    category: "",
    isFavorite: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
        severity: "error"
      })
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
      const response = await recipeFetch.post("/recipe", formData);
      console.log("Dados enviados com sucesso:", response.data);

      // Exibir snackbar de sucesso
      setSnackbar({
        open: true,
        message: "Receita enviada com sucesso!",
        severity: "success",
      });

      // Limpar os campos
      setFormData({
        name: "",
        description: "",
        ingredients: [{ name: "", quantity: 0 }],
        category: "",
        isFavorite: false,
      });
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);

      // Exibir snackbar de erro
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
      }}
    >
      <CardContent>
        <form onSubmit={handleSendRecipe}>
          <TextField
            fullWidth
            label="Digite o nome da Receita"
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
          {formData.ingredients.map((ingredient, index) => (
            <Box key={index} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
              <TextField
                label="Nome do Ingrediente"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                variant="outlined"
                required
                fullWidth
              />
              <TextField
                label="Quantidade"
                name="quantity"
                value={ingredient.quantity}
                type="number"
                // inputProps={{ min: 0 }}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  value >= 0 ? handleIngredientChange(index, e) : null;
                }}
                variant="outlined"
                fullWidth
              />
              <IconButton
                disableRipple
                onClick={() => handleRemoveIngredient(index)}
              >
                <ClearIcon sx={{ color: "red" }} />
              </IconButton>
            </Box>
          ))}
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
            Enviar
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

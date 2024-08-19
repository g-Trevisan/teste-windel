import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Checkbox, Divider, Snackbar, TextField, Typography, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { recipeFetch } from '../axios/config';

export function FormRecipe() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: [{ name: '', quantity: 0 }],
    category: '',
    isFavorite: false,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = [...formData.ingredients];
    newIngredients[index][name] = name === "quantity" ? parseFloat(value) : value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: 0 }],
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isFavorite: e.target.checked });
  };

  const handleSendRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await recipeFetch.post("/recipe", formData);
      console.log('Dados enviados com sucesso:', response.data);
      
      // Exibir snackbar de sucesso
      setSnackbar({ open: true, message: 'Receita enviada com sucesso!', severity: 'success' });
      
      // Limpar os campos
      setFormData({
        name: '',
        description: '',
        ingredients: [{ name: '', quantity: 0 }],
        category: '',
        isFavorite: false,
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      
      // Exibir snackbar de erro
      setSnackbar({ open: true, message: 'Erro ao enviar a receita!', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Card sx={{ minWidth: 350, maxWidth: 600, margin: "auto" }}>
      <CardContent>
        <form onSubmit={handleSendRecipe}>
          <TextField
            fullWidth
            label="Digite o nome da Receita"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
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
            sx={{ marginBottom: 2 }}
          />
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
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
                fullWidth
              />
              <TextField
                label="Quantidade"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                variant="outlined"
                fullWidth
              />
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
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Checkbox
              checked={formData.isFavorite}
              onChange={handleCheckboxChange}
              name="isFavorite"
            />
            <Typography>Favorito</Typography>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      </CardContent>

      {/* Snackbar para alertas */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}

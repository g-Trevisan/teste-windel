import { Link } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import NoFoodIcon from '@mui/icons-material/NoFood';

export const NoRecipeMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        background: "linear-gradient(135deg, #f0f0f0, #e0e0e0)",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        padding: 4,
        mx: 4
      }}
    >
      <NoFoodIcon sx={{ fontSize: "4rem", color: "#b0b0b0", marginBottom: 2 }} />
      <Typography variant="h6" sx={{ color: "#707070", marginBottom: 1 }}>
        Nenhuma Receita Encontrada
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#909090", marginBottom: 3, textAlign: "center" }}
      >
        Parece que não há receitas disponíveis no momento. Por favor, tente
        novamente mais tarde ou adicione novas receitas.
      </Typography>
      <Button
        component={Link}
        to="/newrecipe" //redireciona para a pagina de cadastro
        variant="contained"
        color="primary"
        sx={{ textTransform: "none" }}
      >
        Adicionar Receita
      </Button>
    </Box>
  );
};

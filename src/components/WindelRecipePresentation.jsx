import { Typography, Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export const WindelRecipePresentation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
        borderRadius: 2,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        padding: 6,
        mx: 4,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#333", marginBottom: 2, fontWeight: "bold" }}
      >
        Bem-vindo ao Windel Recipes
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#555", marginBottom: 2, fontSize: "1.1rem" }}
      >
        www.windelrecipes.com.br
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#777", marginBottom: 2, fontSize: "1rem" }}
      >
        windelrecipes@windel.com.br
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#777", marginBottom: 2, fontSize: "1rem" }}
      >
        Contate nossa equipe para mais informações : (54) 3025-2540
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#777", marginBottom: 4, fontSize: "1rem" }}
      >
        Siga-nos nas redes sociais
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginBottom: 4,
        }}
      >
        <IconButton
          component="a"
          href="https://www.facebook.com/windelsistemas"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#4267B2",
            "&:hover": {
              backgroundColor: "#365899",
            },
          }}
        >
          <FacebookIcon sx={{ color: "white", fontSize: "2rem" }} />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.instagram.com/windelsistemas"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#C13584",
            "&:hover": {
              backgroundColor: "#a02d77",
            },
          }}
        >
          <InstagramIcon sx={{ color: "white", fontSize: "2rem" }} />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/company/windel-sistemas/mycompany/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#0077B5",
            "&:hover": {
              backgroundColor: "#005582",
            },
          }}
        >
          <LinkedInIcon sx={{ color: "white", fontSize: "2rem" }} />
        </IconButton>
        <IconButton
          component="a"
          href="https://wa.me/555430252540"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#25D366",
            "&:hover": {
              backgroundColor: "#1ebe54",
            },
          }}
        >
          <WhatsAppIcon sx={{ color: "white", fontSize: "2rem" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

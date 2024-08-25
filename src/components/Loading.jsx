import { Box, CircularProgress, Typography } from "@mui/material";

export const Loading = () => {
    return (
        <Box 
            sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                height: "50vh", 
                textAlign: "center", 
                flexDirection: "column",
                gap: 2 
            }}
        >
            <CircularProgress size={60} sx={{ color: "#1976d2" }} />
            <Typography variant="h6" sx={{ color: "#707070" }}>
                Carregando receitas...
            </Typography>
        </Box>
    );
};
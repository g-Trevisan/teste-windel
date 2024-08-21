import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import { RecipeCard } from "../components/index"
import { recipeFetch } from "../axios/config";

export const ListRecipes = () => {

    const [recipes, setRecipes] = useState([])

    // const apiUrl = "https://teste-tecnico-front-api.up.railway.app/recipe/"

    const getRecipes = async() => {
        
        try{
            const response = await recipeFetch.get("/recipe");
            // console.log(response)
            const data = response.data
            // console.log(data)
            setRecipes(data)
            
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        getRecipes()
    },[])

    return (
        <Box>
            <Grid container spacing={4} sx={{ 
                p: 2, 
                paddingBottom:10, 
                background:"black", 
                padding: 4 
            }}>
                {recipes.map(recipe => (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={recipe.id}>
                        <RecipeCard
                            recipeId={recipe.id}
                            name={recipe.name}
                            description={recipe.description}
                            category={recipe.category}
                            isFavorite={recipe.isFavorite}
                            ingredients={recipe.ingredients}
                            refreshRecipes={getRecipes}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{width: "100%",display:"flex", alignItems:"center", justifyContent:"center"}} >
                <Typography sx={{color:"white"}}>Paginação será aqui</Typography>
            </Box>
        </Box>
    );    
}

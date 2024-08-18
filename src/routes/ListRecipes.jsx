import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid  } from "@mui/material";
import { RecipeCard } from "../components/index"

export const ListRecipes = () => {

    const [recipes, setRecipes] = useState([])

    const apiUrl = "https://teste-tecnico-front-api.up.railway.app/recipe/"

    const getRecipes = async() => {
        
        try{
            const response = await axios.get(apiUrl);
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
        <Grid container spacing={2} sx={{ p: "1rem", color: "white" }}>
            {recipes.map(recipe => (
                <Grid item xs={12} sm={12} md={6} lg={6} key={recipe.recipeID}>
                    <RecipeCard
                        name={recipe.name}
                        description={recipe.description}
                        category={recipe.category}
                        isFavorite={recipe.isFavorite}
                        ingredients={recipe.ingredients}
                        sx={{ minWidth: 200 }} // Ajuste o valor conforme necessário
                    />
                </Grid>
            ))}
        </Grid>
    );    
}

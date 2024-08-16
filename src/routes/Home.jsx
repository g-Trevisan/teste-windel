import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {

    const [recipe, setRecipes] = useState([])

    // const apiUrl = "http://teste-tecnico-front-api.up.railway.app/recipe"
    const apiUrl = "https://teste-tecnico-front-api.up.railway.app/recipe/"

    const getRecipes = async() => {
        
        try{
            const response = await axios.get(apiUrl);
            console.log(response)
        } catch (error) {
            console.log(error);
        }

    }
    getRecipes()
    // useEffect(() => {
    //     getRecipes()
    // },[])

    return (
    <div>
      Home
    </div>
  )
}

import { Box, Card, CardContent, Typography, Divider, List, ListItem, ListItemText, Chip  } from "@mui/material";
import { EditGenericIcon, DeleteGenericIcon} from "../components/index";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';


export const RecipeCard = ({ 
    recipeId, 
    name, 
    description, 
    isFavorite, 
    category,
    ingredients,

}) => {
  return (
    <div>
        <Card key={recipeId} sx={{ minWidth: 350, maxWidth: 350, margin: "auto"}}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                    <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", flexGrow: 1 }}>
                        {name}
                    </Typography>
                    <IconButton sx={{ position: "absolute", right:0, top: -3}}>
                        <MoreVertIcon sx={{ height: "1.25rem"}}/>
                    </IconButton>
                </Box>
                <Divider sx={{ marginY: 1}} />
                <Typography variant="body2" sx={{display:"flex", alignItems:"center"}}>
                    <RestaurantIcon  />  {description}
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Typography variant="h6" sx={{marginBottom:"-1rem"}}>
                    Ingredientes
                </Typography>
                <List sx={{}}>
                    {ingredients.map(ingredient => (
                        <ListItem key={ingredient.id} sx={{mb: "-1.25rem"}}>
                            <ListItemText 
                                primary={`Descrição - ${ingredient.name}`} 
                                secondary= {`Quantidade - ${ingredient.quantity}`}
                            />
                        </ListItem>    
                    ))}
                </List>
                <Divider sx={{ marginY: 1}} />
                <Box sx={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
                    <Box sx={{display: "flex", gap: "0.25rem"}}>
                        <Chip label= {category} color="primary" />
                        {isFavorite && <Chip label="Favorito" color="primary" />} 
                    </Box>
                    <Box sx={{display: "flex", gap: "0.25rem"}}>
                        <EditGenericIcon/>
                        <DeleteGenericIcon/>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </div>
  )
}


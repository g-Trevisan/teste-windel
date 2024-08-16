import { AppBar, Toolbar, Button, Typography, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import "../styles/Global.css"
import logowindel from '../assets/logowindel.png'

export function HeaderTop() {
    return (
      <AppBar sx={{backgroundColor: '#105BAB'}} position="fixed">
        <Toolbar>
          <img src={logowindel} alt="Logo" style={{ width: '50px', marginRight: '16px' }} />
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Windel Recipes
          </Typography>
          <Box className="Box" sx={{ gap: 3, display: 'flex' }}>
            <Button variant='contained' component={Link} to="/">Home</Button>
            <Button variant='contained' component={Link} to="/newrecipe">New Recipe</Button>
            <Button variant='contained' component={Link} to="/listrecipe">List Recipes</Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
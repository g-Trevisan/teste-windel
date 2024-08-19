import { AppBar, Toolbar, Button, Typography, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import "../styles/Global.css"
import logowindel from '../assets/logowindel.png'

export function HeaderTop() {
    return (
      <AppBar sx={{backgroundColor: '#105BAB'}} position="fixed">
        <Toolbar sx = {{ justifyContent: "center"}}>
          <img src={logowindel} alt="Logo" style={{ width: '90px', marginRight: '16px', flexGrow: {xs: "1"} }} />
          <Typography variant="h5" sx={{ flexGrow: 1, display: {  xs: 'none', sm: 'none', md: 'block' }  }}>
            Windel Recipes
          </Typography>
          <Box className="Box" sx={{ gap: 3, display: "flex", alignItems:"center"}}>
            <Button variant='contained' component={Link} to="/">Home</Button>
            <Button variant='contained' component={Link} to="/newrecipe">Cadastros</Button>
            <Button variant='contained' component={Link} to="/listrecipe">Consultas</Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
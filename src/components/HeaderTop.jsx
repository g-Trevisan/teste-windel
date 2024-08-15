// import React from 'react';
// import { Link } from 'react-router-dom';

// export const HeaderTop = () => {
//   return (
//     <nav>
//         <ul>
//             <li>
//                 <Link to={`/`}>Home</Link>    
//             </li>        
//             <li>
//                 <Link to={`/listrecipe`}>Consultar Receita</Link>
//             </li>
//             <li>
//                 <Link to={`/newrecipe`}>Cadastrar Receita</Link>
//             </li>
//         </ul>
//     </nav>
//   )
// }


import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function HeaderTop() {
    return (
      <AppBar sx={{backgroundColor: '#063970'}} position="fixed">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Windel Recipes
          </Typography>
          <Button variant='contained' color="inherit" component={Link} to="/">Home</Button>
          <Button variant='contained' color="inherit" component={Link} to="/newrecipe">New Recipe</Button>
          <Button variant='contained' color="inherit" component={Link} to="/listrecipe">List Recipes</Button>
        </Toolbar>
      </AppBar>
    );
  }
import { Outlet } from 'react-router-dom';
import { HeaderTop } from './components/HeaderTop';
import { Box } from '@mui/material';

export function App() {
  return (
    <div>
      <HeaderTop/>  {/* menu fixo no topo, sendo renderizado fora do carregamento das rotas */}
      <Box component="main" sx={{marginTop: 8, padding: 2}}>
        <Outlet/>  {/* As rotas serão carregadas no outlet */}
      </Box>
    </div>
  )
}
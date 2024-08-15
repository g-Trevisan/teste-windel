import { Outlet } from 'react-router-dom';
import { HeaderTop } from './components/HeaderTop';
import { Box } from '@mui/material';

export function App() {
  return (
    <div>
      <HeaderTop/>
      <Box component="main" sx={{marginTop: 8, padding: 2}}>
        <Outlet/>
      </Box>
    </div>
  )
}
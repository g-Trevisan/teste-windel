import './styles/App.css'
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}
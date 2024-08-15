import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import './styles/Global.css'

import {createBrowserRouter, RouterProvider, Route} from 'react-router-dom';

//páginas
import { Home, NewRecipe, ListRecipes } from './routes';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/newrecipe",
        element: <NewRecipe/>
      },
      {
        path: "/listrecipe",
        element: <ListRecipes/>
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

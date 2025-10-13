import { createBrowserRouter,  } from 'react-router-dom'
import Layout from '@/layouts/Layout'
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'
import Favorites from '@/pages/Favorites'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "/detail/:id",
            element: <Detail />
          },
          {
            path: "/favorites",
            element: <Favorites />
          }
        ]
    }
])
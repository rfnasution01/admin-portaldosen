import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  DashboardPage,
  LoginLayout,
  MainLayout,
} from './loadables'
import Cookies from 'js-cookie'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (!jwtPayload) {
        return redirect('/login')
      }

      return null
    },
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'umum',
        element: <ComingSoonPage />,
      },
      {
        path: 'jadwal-perkuliahan',
        element: <ComingSoonPage />,
      },
      {
        path: 'Kalender',
        element: <ComingSoonPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginLayout />,
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (jwtPayload) {
        return redirect('/')
      }

      return null
    },
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])

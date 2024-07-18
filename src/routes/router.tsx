import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  CommonLayout,
  JadwalKuliahDetailPage,
  JadwalKuliahMahasiswaPage,
  JadwalKuliahPage,
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
        element: <CommonLayout />,
        children: [
          {
            path: '',
            element: <JadwalKuliahPage />,
          },
        ],
      },
      {
        path: 'jadwal-kuliah',
        element: <CommonLayout />,
        children: [
          {
            path: '',
            element: <ComingSoonPage />,
          },
          {
            path: 'detail',
            element: <JadwalKuliahDetailPage />,
          },
          {
            path: 'mahasiswa',
            element: <JadwalKuliahMahasiswaPage />,
          },
        ],
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

import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  CommonLayout,
  DashboardPage,
  EditTahunAkademikPage,
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
            element: <DashboardPage />,
          },
        ],
      },
      {
        path: 'jadwal-perkuliahan',
        element: <CommonLayout />,
        children: [
          {
            path: '',
            element: <JadwalKuliahPage />,
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
        path: 'edit-ta',
        element: <EditTahunAkademikPage />,
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

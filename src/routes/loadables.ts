import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------
export const CommonLayout = loadable(() => import('@/layouts/CommonLayout'))
export const LoginLayout = loadable(() => import('@/layouts/loginLayout'))
export const MainLayout = loadable(() => import('@/layouts/mainLayout'))

// ------------------
// ----- Pages -----
// ------------------
export const ComingSoonPage = loadable(() => import('@/pages/ComingSoon'))
export const JadwalKuliahPage = loadable(
  () => import('@/pages/dashboard/JadwalKuliah'),
)
export const JadwalKuliahDetailPage = loadable(
  () => import('@/pages/dashboard/JadwalKuliahDetail'),
)
export const JadwalKuliahMahasiswaPage = loadable(
  () => import('@/pages/dashboard/JadwalKuliahMahasiswa'),
)

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
export const DashboardPage = loadable(() => import('@/pages/Dashboard'))
export const EditTahunAkademikPage = loadable(
  () => import('@/pages/EditTahunAkademik'),
)

export const JadwalKuliahPage = loadable(
  () => import('@/pages/jadwalKuliah/JadwalKuliah'),
)
export const JadwalKuliahDetailPage = loadable(
  () => import('@/pages/jadwalKuliah/JadwalKuliahDetail'),
)
export const JadwalKuliahMahasiswaPage = loadable(
  () => import('@/pages/jadwalKuliah/JadwalKuliahMahasiswa'),
)

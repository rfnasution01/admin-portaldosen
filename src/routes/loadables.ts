import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------
export const CommonLayout = loadable(() => import('@/layouts/CommonLayout'))
export const LoginLayout = loadable(() => import('@/layouts/loginLayout'))
export const MainLayout = loadable(() => import('@/layouts/mainLayout'))
export const NilaiMahasiswaLayout = loadable(
  () => import('@/layouts/siakadLayout/NilaiMahasiswaLayout'),
)

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
export const NilaiMahasiswaPage = loadable(
  () => import('@/pages/jadwalKuliah/NilaiMahasiswa'),
)
export const NilaiMahasiswaPerAspekPage = loadable(
  () => import('@/pages/jadwalKuliah/NilaiMahasiswaPerAspek'),
)

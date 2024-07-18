import { api, Res } from '@/store/api'
import {
  GetSiakadJadwalKuliahMahasiswaType,
  GetSiakadJadwalKuliahType,
  GetSiakadKataBijakType,
} from '@/store/type/siakad/jadwalKuliah'

export const SiakadProfilEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSiakadKataBijak: builder.query<Res<GetSiakadKataBijakType>, void>({
      query: () => ({
        url: `siakad/katabijak`,
        method: 'GET',
      }),
    }),
    getSiakadJadwalKuliah: builder.query<
      Res<GetSiakadJadwalKuliahType[]>,
      void
    >({
      query: () => ({
        url: `siakad/jadwal_kuliah`,
        method: 'GET',
      }),
    }),
    getSiakadJadwalKuliahDetail: builder.query<
      Res<GetSiakadJadwalKuliahType>,
      { id_jadwal: string }
    >({
      query: ({ id_jadwal }) => ({
        url: `siakad/jadwal_kuliah_detail`,
        method: 'GET',
        params: {
          id_jadwal: id_jadwal,
        },
      }),
    }),
    getSiakadJadwalKuliahMahasiswa: builder.query<
      Res<GetSiakadJadwalKuliahMahasiswaType[]>,
      { id_jadwal: string }
    >({
      query: ({ id_jadwal }) => ({
        url: `siakad/jadwal_kuliah_mhs`,
        method: 'GET',
        params: {
          id_jadwal: id_jadwal,
        },
      }),
    }),
  }),
})

export const {
  useGetSiakadKataBijakQuery,
  useGetSiakadJadwalKuliahDetailQuery,
  useGetSiakadJadwalKuliahMahasiswaQuery,
  useGetSiakadJadwalKuliahQuery,
} = SiakadProfilEndpoints

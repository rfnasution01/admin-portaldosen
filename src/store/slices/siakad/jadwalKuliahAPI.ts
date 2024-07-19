import { api, Res } from '@/store/api'
import {
  GetSiakadBobotNilaiTyoe,
  GetSiakadJadwalKuliahMahasiswaType,
  GetSiakadJadwalKuliahNilaiMahasiswaType,
  GetSiakadJadwalKuliahType,
  GetSiakadKataBijakType,
  PostJadwalKuliahType,
} from '@/store/type/siakad/jadwalKuliahType'

export const SiakadProfilEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSiakadKataBijak: builder.query<Res<GetSiakadKataBijakType>, void>({
      query: () => ({
        url: `siakad/katabijak`,
        method: 'GET',
      }),
      providesTags: ['siakad-profil'],
    }),
    getSiakadJadwalKuliah: builder.query<
      Res<GetSiakadJadwalKuliahType[]>,
      void
    >({
      query: () => ({
        url: `siakad/jadwal_kuliah`,
        method: 'GET',
      }),
      providesTags: ['siakad-profil'],
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
      providesTags: ['siakad-profil'],
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
      providesTags: ['siakad-profil'],
    }),
    getSiakadNilaiMahasiswa: builder.query<
      Res<GetSiakadJadwalKuliahNilaiMahasiswaType>,
      { id_jadwal: string }
    >({
      query: ({ id_jadwal }) => ({
        url: `siakad/jadwal_kuliah_mhs_nilai`,
        method: 'GET',
        params: {
          id_jadwal: id_jadwal,
        },
      }),
      providesTags: ['siakad-nilai-mahasiswa'],
    }),
    getBobotNilai: builder.query<Res<GetSiakadBobotNilaiTyoe[]>, void>({
      query: () => ({
        url: `siakad/bobot_nilai`,
        method: 'GET',
      }),
    }),
    updateNilai: builder.mutation<void, { body: PostJadwalKuliahType }>({
      query: ({ body }) => ({
        url: `siakad/jadwal_kuliah_mhs_nilai_aspek`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['siakad-nilai-mahasiswa'],
    }),
  }),
})

export const {
  useGetSiakadKataBijakQuery,
  useGetSiakadJadwalKuliahDetailQuery,
  useGetSiakadJadwalKuliahMahasiswaQuery,
  useGetSiakadJadwalKuliahQuery,
  useGetSiakadNilaiMahasiswaQuery,
  useGetBobotNilaiQuery,
  useUpdateNilaiMutation,
} = SiakadProfilEndpoints

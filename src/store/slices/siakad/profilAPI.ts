import { api, Res } from '@/store/api'
import { GetSiakadProfilType } from '@/store/type/siakad/profilType'

export const SiakadProfilEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSiakadProfil: builder.query<Res<GetSiakadProfilType>, void>({
      query: () => ({
        url: `siakad/profil`,
        method: 'GET',
      }),
      providesTags: ['siakad-profil'],
    }),
  }),
})

export const { useGetSiakadProfilQuery } = SiakadProfilEndpoints

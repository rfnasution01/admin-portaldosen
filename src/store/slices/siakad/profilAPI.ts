import { api, Res } from '@/store/api'
import {
  GetSiakadIdentitasType,
  GetSiakadProfilType,
  PostProfilBody,
} from '@/store/type/siakad/profilType'

export const SiakadProfilEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSiakadProfil: builder.query<Res<GetSiakadProfilType>, void>({
      query: () => ({
        url: `siakad/profil`,
        method: 'GET',
      }),
      providesTags: ['siakad-profil'],
    }),
    getSiakadIdentitas: builder.query<Res<GetSiakadIdentitasType>, void>({
      query: () => ({
        url: `siakad/identitas`,
        method: 'GET',
      }),
    }),
    updateSiakadProfil: builder.mutation<void, { body: PostProfilBody }>({
      query: ({ body }) => ({
        url: `siakad/profil/identitas`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['siakad-profil'],
    }),
  }),
})

export const {
  useGetSiakadProfilQuery,
  useUpdateSiakadProfilMutation,
  useGetSiakadIdentitasQuery,
} = SiakadProfilEndpoints

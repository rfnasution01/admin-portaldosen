import { api } from '@/store/api'
import { PostTahunAkademikBody } from '@/store/type/siakad/tahunAkademikType'

export const SiakadTahunAkademikEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    updateTahunAkademik: builder.mutation<
      void,
      { body: PostTahunAkademikBody }
    >({
      query: ({ body }) => ({
        url: `siakad/profil/akademik`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['siakad-profil'],
    }),
  }),
})

export const { useUpdateTahunAkademikMutation } = SiakadTahunAkademikEndpoints

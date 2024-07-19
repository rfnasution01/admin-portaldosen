import { api } from '../api'

export const PhotoEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    updatePhoto: builder.mutation<void, FormData>({
      query: (foto) => ({
        url: `siakad/profil_photo`,
        method: 'POST',
        body: foto,
      }),
      invalidatesTags: ['siakad-profil'],
    }),
  }),
})

export const { useUpdatePhotoMutation } = PhotoEndpoints

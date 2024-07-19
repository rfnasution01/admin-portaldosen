import { Res, api } from '../api'
import { GetProdiType } from '../type/referensiType'

export const ReferensiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getProdi: builder.query<Res<GetProdiType[]>, void>({
      query: () => ({
        url: `referensi/program_studi`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetProdiQuery } = ReferensiEndpoints

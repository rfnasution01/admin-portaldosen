import zod from 'zod'

export const SiakadTahunAkademikSchema = zod.object({
  tahun: zod.string().nullable().nullish().optional(),
  tahap: zod.string().nullable().nullish().optional(),
  kode_prodi: zod.string().nullable().nullish().optional(),
})

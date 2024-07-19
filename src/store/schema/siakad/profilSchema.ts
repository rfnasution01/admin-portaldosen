import zod from 'zod'

export const SiakadProfilSchema = zod.object({
  nama: zod.string().nullable().nullish().optional(),
  gelar_depan: zod.string().nullable().nullish().optional(),
  gelar_belakang: zod.string().nullable().nullish().optional(),
  hp: zod.string().nullable().nullish().optional(),
  nidn: zod.string().nullable().nullish().optional(),
  email: zod.string().nullable().nullish().optional(),
})

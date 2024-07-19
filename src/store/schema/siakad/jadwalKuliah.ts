import zod from 'zod'

export const SiakadJadwalKuliahSchema = zod
  .object({
    idm: zod.string().nullable().nullish().optional(),
    id_mk: zod.string().nullable().nullish().optional(),
    id_aspek: zod.string().nullable().nullish().optional(),
    nilai: zod.string().nullable().nullish().optional(),
  })
  .catchall(zod.string().nullable().nullish().optional())

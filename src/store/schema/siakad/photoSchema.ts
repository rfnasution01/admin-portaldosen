import zod from 'zod'

export const SiakadPhotoSchema = zod.object({
  photo: zod.string().nullable().nullish().optional(),
})

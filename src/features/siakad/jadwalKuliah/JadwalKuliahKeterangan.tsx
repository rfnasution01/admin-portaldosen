import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'

export function JadwalKuliahKeterangan() {
  const { bobot } = useSiakadJadwalKuliah()

  const listKeterangan = [
    'Nilai yang dimasukkan adalah nilai mentah (bukan nilai setelah persentase).',
    'Input nilai secara berurutan mulai dari nilai persentase sampai dengan nilai UAS.',
    'Setelah selesai menginput nilai, ajukan nilai ke program studi',
  ]

  const transformedString = bobot
    ?.map((item) => `${item.nilai} = ${item.nilai_min}-${item.nilai_max}`)
    .join(', ')

  return (
    <div className="bg-neutral-yellow flex flex-col gap-32 rounded-2x border p-32 text-neutral-black">
      <p>Keterangan:</p>
      <div className="ml-12 flex flex-col gap-12">
        {listKeterangan?.map((item, idx) => (
          <p key={idx} style={{ lineHeight: '130%' }}>
            {idx + 1}. {item}
          </p>
        ))}
        <p style={{ lineHeight: '130%' }}>
          {listKeterangan?.length + 1}. {transformedString}
        </p>
      </div>
    </div>
  )
}

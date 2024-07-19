export function JadwalKuliahKeterangan() {
  const listKeterangan = [
    'Nilai yang dimasukkan adalah nilai mentah (bukan nilai setelah persentase).',
    'Input nilai secara berurutan mulai dari nilai persentase sampai dengan nilai UAS.',
    'Setelah selesai menginput nilai, ajukan nilai ke program studi',
  ]

  return (
    <div className="bg-neutral-yellow flex flex-col gap-32 rounded-2x border p-32 text-neutral-black">
      <p>Keterangan:</p>
      <div className="ml-12 flex flex-col gap-12">
        {listKeterangan?.map((item, idx) => (
          <p key={idx} style={{ lineHeight: '130%' }}>
            {idx + 1}. {item}
          </p>
        ))}
      </div>
    </div>
  )
}

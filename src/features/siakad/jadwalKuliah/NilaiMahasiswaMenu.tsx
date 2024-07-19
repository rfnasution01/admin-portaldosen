import { SiakadAspekNilaiType } from '@/store/type/siakad/jadwalKuliahType'

export function AspekNilaiMahasiswaMenu({
  aspekNilai,
}: {
  aspekNilai: SiakadAspekNilaiType[]
}) {
  return (
    <div className="scrollbar flex w-full items-center gap-12 overflow-x-auto">
      {aspekNilai?.map((item, idx) => (
        <div key={idx}>
          <button className="rounded-3xl bg-primary-900 px-24 py-16 text-neutral-white">
            <p className="text-nowrap">
              {item?.nama} ({item?.persen}%)
            </p>
          </button>
        </div>
      ))}
    </div>
  )
}

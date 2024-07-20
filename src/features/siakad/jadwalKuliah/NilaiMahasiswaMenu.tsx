import { PrintHasil } from '@/components/PrintComponent'
import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'
import { useSiakadProfil } from '@/data/siakad/useProfil'
import { SiakadAspekNilaiType } from '@/store/type/siakad/jadwalKuliahType'
import { convertToSlug } from '@/utils/formatText'
import { usePathname } from '@/utils/usePathname'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export function AspekNilaiMahasiswaMenu({
  aspekNilai,
}: {
  aspekNilai: SiakadAspekNilaiType[]
}) {
  const handlePrintClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation()
  }

  const { thirdPathname } = usePathname()
  const { nilaiMahasiswa, jadwalKuliahDetail } = useSiakadJadwalKuliah()
  const { identitas, profil } = useSiakadProfil()

  return (
    <div className="scrollbar flex w-full items-center justify-between gap-12 overflow-x-auto">
      <div className="flex gap-12">
        {aspekNilai?.map((item, idx) => (
          <Link
            to={convertToSlug(item?.nama)}
            key={idx}
            onClick={() => localStorage.setItem('editID', item?.id)}
          >
            <button
              className={clsx('rounded-3xl border px-24 py-16 ', {
                'border-transparent bg-primary-900 text-neutral-white':
                  thirdPathname !== convertToSlug(item?.nama),
                'border-primary-900 text-primary-900':
                  thirdPathname === convertToSlug(item?.nama),
              })}
            >
              <p className="text-nowrap">
                {item?.nama} ({item?.persen}%)
              </p>
            </button>
          </Link>
        ))}
        <Link to={'/jadwal-perkuliahan/mahasiswa'}>
          <button
            className={clsx('rounded-3xl border px-24 py-16 ', {
              'border-transparent bg-primary-900 text-neutral-white':
                thirdPathname !== undefined,
              'border-primary-900 text-primary-900':
                thirdPathname === undefined,
            })}
          >
            <p className="text-nowrap">Rekap Nilai</p>
          </button>
        </Link>
      </div>
      <button
        onClick={handlePrintClick}
        className="flex items-center gap-12 rounded-2xl bg-primary-900 px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
      >
        <PrintHasil
          response={nilaiMahasiswa}
          jadwalKuliahDetail={jadwalKuliahDetail}
          identitas={identitas}
          profil={profil}
        />
      </button>
    </div>
  )
}

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
  const { thirdPathname } = usePathname()

  return (
    <div className="scrollbar flex w-full items-center gap-12 overflow-x-auto">
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
    </div>
  )
}

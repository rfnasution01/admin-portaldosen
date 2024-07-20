import SkeletonText from '@/components/SkeletonComonent/SkeletonText'
import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'
import {
  AspekNilaiMahasiswaMenu,
  JadwalKuliahInfo,
  JadwalKuliahKeterangan,
} from '@/features/siakad/jadwalKuliah'
import { usePathname } from '@/utils/usePathname'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Outlet, useNavigate } from 'react-router-dom'

export default function NilaiMahasiswaLayout() {
  const navigate = useNavigate()

  const {
    jadwalKuliahDetail,
    loadingJadwalKuliah,
    nilaiMahasiswa,
    loadingNilaiMahasiswa,
  } = useSiakadJadwalKuliah()
  const { thirdPathname } = usePathname()

  return (
    <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto p-32">
      <div
        onClick={() => {
          if (thirdPathname === undefined) {
            navigate(-1)
          } else {
            navigate('/jadwal-perkuliahan/mahasiswa')
          }
        }}
        className="flex items-center gap-12 font-sans text-[2.2rem] text-black-300 hover:cursor-pointer hover:text-primary-active"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} />
        <p>Kembali</p>
      </div>
      <p className="font-sans text-[2.8rem] font-bold text-black-300">
        Jadwal Perkuliahan
      </p>
      <div className="flex flex-col gap-8 border-l-2 border-primary-900 bg-primary-50 p-32">
        {loadingJadwalKuliah ? (
          <SkeletonText lines={4} />
        ) : (
          <JadwalKuliahInfo jadwalKuliahDetail={jadwalKuliahDetail} />
        )}
      </div>

      <JadwalKuliahKeterangan />
      <div>
        {loadingNilaiMahasiswa ? (
          <SkeletonText lines={1} className="w-1/4 phones:w-1/2" />
        ) : (
          <AspekNilaiMahasiswaMenu aspekNilai={nilaiMahasiswa?.aspek_nilai} />
        )}
      </div>

      <Outlet />
    </div>
  )
}

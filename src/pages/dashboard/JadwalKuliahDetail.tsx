import { LabelJadwalKuliah } from '@/components/LabelComponent'
import SkeletonText from '@/components/SkeletonComonent/SkeletonText'
import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

export default function JadwalKuliahDetail() {
  const navigate = useNavigate()

  const { jadwalKuliahDetail, loadingJadwalKuliah } = useSiakadJadwalKuliah()

  return (
    <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto p-32 font-sans">
      <div
        onClick={() => {
          navigate(-1)
        }}
        className="text-black-300 flex items-center gap-12 font-sans text-[2.2rem] hover:cursor-pointer hover:text-primary-active"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} />
        <p>Kembali</p>
      </div>

      <p className="text-black-300 font-sans text-[2.8rem] font-bold">
        Jadwal Perkuliahan
      </p>
      <div className="bg-primary-50 flex flex-col gap-8 border-l-2 border-primary-900 p-32">
        {loadingJadwalKuliah ? (
          <SkeletonText lines={4} />
        ) : (
          <>
            <LabelJadwalKuliah
              label1="Mata Kuliah"
              value1={jadwalKuliahDetail?.nama_mk}
              label2="Tahun Ajaran / Tahapan"
              value2={`${jadwalKuliahDetail?.tahun} / ${jadwalKuliahDetail?.tahap}`}
            />
            <LabelJadwalKuliah
              label1="Fakultas"
              value1={jadwalKuliahDetail?.fakultas}
              label2="Ruangan"
              value2={jadwalKuliahDetail?.nama_kelas}
            />
            <LabelJadwalKuliah
              label1="Program Studi"
              value1={jadwalKuliahDetail?.prodi}
              label2="Hari / Sesi"
              value2={`${jadwalKuliahDetail?.hari ?? '-'} / ${jadwalKuliahDetail?.jam_mulai ?? '-'} - ${jadwalKuliahDetail?.jam_selesai ?? '-'}`}
            />
            <LabelJadwalKuliah
              label1="Dosen"
              value1=""
              label2="Kelas Perkuliahan"
              value2={jadwalKuliahDetail?.kode_mk}
            />
          </>
        )}
      </div>
    </div>
  )
}

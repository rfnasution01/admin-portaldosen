import { LabelJadwalKuliah } from '@/components/LabelComponent'
import { GetSiakadJadwalKuliahType } from '@/store/type/siakad/jadwalKuliahType'

export function JadwalKuliahInfo({
  jadwalKuliahDetail,
}: {
  jadwalKuliahDetail: GetSiakadJadwalKuliahType
}) {
  return (
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
        value2={jadwalKuliahDetail?.ruangan}
      />
      <LabelJadwalKuliah
        label1="Program Studi"
        value1={jadwalKuliahDetail?.prodi}
        label2="Hari / Sesi"
        value2={`${jadwalKuliahDetail?.hari ?? '-'} / ${jadwalKuliahDetail?.jam_mulai ?? '-'} - ${jadwalKuliahDetail?.jam_selesai ?? '-'}`}
      />
      <LabelJadwalKuliah
        label1="Dosen"
        dosen={jadwalKuliahDetail?.dosen}
        label2="Kelas Perkuliahan"
        value2={jadwalKuliahDetail?.nama_kelas}
      />
    </>
  )
}

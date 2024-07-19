import { TableMahasiswaPerAspek } from '@/components/TableComponent/TableNilaiMahasiswaPerAspek'
import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'

export default function NilaiMahasiswaPerAspek() {
  const { nilaiMahasiswa, loadingNilaiMahasiswa } = useSiakadJadwalKuliah()

  return (
    <TableMahasiswaPerAspek
      response={nilaiMahasiswa}
      loading={loadingNilaiMahasiswa}
      pageSize={1000}
      currentPage={1}
    />
  )
}

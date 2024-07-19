import { TableMahasiswaPerAspek } from '@/components/TableComponent/TableNilaiMahasiswaPerAspek'
import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'

export default function NilaiMahasiswaPerAspek() {
  const { nilaiMahasiswaTransform, nilaiMahasiswa, loadingNilaiMahasiswa } =
    useSiakadJadwalKuliah()

  return (
    <TableMahasiswaPerAspek
      response={nilaiMahasiswaTransform}
      loading={loadingNilaiMahasiswa}
      pageSize={1000}
      currentPage={1}
      nilaiMahasiswa={nilaiMahasiswa}
    />
  )
}

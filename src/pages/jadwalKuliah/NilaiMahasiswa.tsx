import { TableMahasiswa } from '@/components/TableComponent/TableNilaiMahasiswa'
import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'

export default function NilaiMahasiswa() {
  const { nilaiMahasiswa, loadingNilaiMahasiswa } = useSiakadJadwalKuliah()

  return (
    <TableMahasiswa
      response={nilaiMahasiswa}
      loading={loadingNilaiMahasiswa}
      pageSize={1000}
      currentPage={1}
    />
  )
}

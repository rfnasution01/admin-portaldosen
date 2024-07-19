import { Table } from '@/components/TableComponent'
import { columnsListJadwalKuliah } from '@/components/TableComponent/column'
import { useSiakadDashboard } from '@/data/siakad/dashboard/useDashboard'

export default function JadwalKuliahDetail() {
  const { jadwalKuliah, loadingJadwalKuliah } = useSiakadDashboard()

  return (
    <div className="scrollbar flex h-full  w-full flex-col gap-32 overflow-y-auto p-32">
      <p className="font-sans text-[2.8rem] font-bold text-black-300">
        Jadwal Perkuliahan
      </p>
      <Table
        data={jadwalKuliah}
        columns={columnsListJadwalKuliah}
        loading={loadingJadwalKuliah}
        isNumber
        currentPage={1}
        pageSize={1000}
        isAksi
      />
    </div>
  )
}

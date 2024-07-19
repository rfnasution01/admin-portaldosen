import SkeletonText from '@/components/SkeletonComonent/SkeletonText'
import { Table } from '@/components/TableComponent'
import { columnsListJadwalKuliah } from '@/components/TableComponent/column'
import { useSiakadDashboard } from '@/data/siakad/dashboard/useDashboard'
import { useSiakadProfil } from '@/data/siakad/useProfil'

export default function JadwalKuliahMahasiswa() {
  const { profil } = useSiakadProfil()
  const { kataBijak, loadingKataBijak, jadwalKuliah, loadingJadwalKuliah } =
    useSiakadDashboard()

  return (
    <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto p-32">
      <p className="text-black-300 font-sans text-[2.8rem] font-bold">
        Selamat Datang, Pak {profil?.identitas?.nama}
      </p>
      <div className="bg-neutral-secondary text-neutral-black flex flex-col rounded-2xl border p-32 font-mono text-[2.2rem]">
        {loadingKataBijak ? (
          <SkeletonText lines={2} />
        ) : (
          <>
            <p>{kataBijak?.isi}</p>
            <p>~ {kataBijak?.pengarang}</p>
          </>
        )}
      </div>
      <p className="text-black-300 font-sans text-[2.8rem] font-bold">
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

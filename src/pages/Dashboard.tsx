import SkeletonText from '@/components/SkeletonComonent/SkeletonText'
import { Table } from '@/components/TableComponent'
import { columnsListJadwalKuliah } from '@/components/TableComponent/column'
import { useSiakadDashboard } from '@/data/siakad/dashboard/useDashboard'
import { useSiakadProfil } from '@/data/siakad/useProfil'

export default function Dashboard() {
  const { profil } = useSiakadProfil()
  const { kataBijak, loadingKataBijak, jadwalKuliah, loadingJadwalKuliah } =
    useSiakadDashboard()

  return (
    <div className="scrollbar flex h-full  w-full flex-col gap-32 overflow-y-auto p-32">
      <p className="font-sans text-[2.8rem] font-bold text-black-300">
        Selamat Datang,{' '}
        {profil?.identitas?.jenis_kelamin === '1'
          ? 'Pak'
          : profil?.identitas?.jenis_kelamin === '0'
            ? 'Bu'
            : ''}{' '}
        {profil?.identitas?.nama}
      </p>
      <div className="flex flex-col rounded-2xl border bg-neutral-secondary p-32 font-mono text-[2.2rem] text-neutral-black">
        {loadingKataBijak ? (
          <SkeletonText lines={2} />
        ) : (
          <>
            <p>{kataBijak?.isi}</p>
            <p>~ {kataBijak?.pengarang}</p>
          </>
        )}
      </div>
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

import { GetSiakadJadwalKuliahType } from '@/store/type/siakad/jadwalKuliah'
import { Column } from '..'

export const columnsListJadwalKuliah: Column<GetSiakadJadwalKuliahType>[] = [
  {
    header: 'Kode',
    key: 'kode_mk',
    width: '!min-w-[12rem]',
  },
  { header: 'Mata Kuliah', key: 'nama_mk', width: '!min-w-[12rem]' },
  { header: 'SKS', key: 'sks_mk', width: '!min-w-[12rem]' },
  { header: 'Kelas', key: 'nama_kelas', width: '!min-w-[12rem]' },
  { header: 'Ruang', key: 'nama_kelas', width: '!min-w-[12rem]' },
  { header: 'Hari/Jam', key: 'hari', width: '!min-w-[12rem]' },
  { header: 'Status', key: 'status', width: '!min-w-[12rem]' },
]

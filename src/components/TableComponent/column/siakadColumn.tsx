import {
  GetSiakadJadwalKuliahMahasiswaType,
  GetSiakadJadwalKuliahType,
} from '@/store/type/siakad/jadwalKuliahType'
import { Column } from '..'
import { getInitials } from '@/utils/formatText'

export const columnsListJadwalKuliah: Column<GetSiakadJadwalKuliahType>[] = [
  {
    header: 'Kode',
    key: 'kode_mk',
    width: '!min-w-[12rem]',
  },
  { header: 'Mata Kuliah', key: 'nama_mk', width: '!min-w-[12rem]' },
  { header: 'SKS', key: 'sks_mk', width: '!min-w-[12rem]' },
  { header: 'Kelas', key: 'nama_kelas', width: '!min-w-[12rem]' },
  { header: 'Ruang', key: 'ruangan', width: '!min-w-[12rem]' },
  {
    header: 'Hari/Jam',
    key: 'hari',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div>{`${rowData?.hari ?? '-'} / ${rowData?.jam_mulai ?? '-'} - ${rowData?.jam_selesai ?? '-'}`}</div>
      )
    },
  },
  { header: 'Status', key: 'status', width: '!min-w-[12rem]' },
]

export const columnsListJadwalKuliahMahasiswa: Column<GetSiakadJadwalKuliahMahasiswaType>[] =
  [
    {
      header: 'Foto',
      key: 'hari',
      width: '!min-w-[12rem]',
      renderCell: (rowData) => {
        return (
          <div>
            {rowData?.foto ? (
              <img
                src={rowData?.foto}
                alt={rowData?.nama}
                className="h-[4rem] w-[4rem] rounded-xl"
                loading="lazy"
              />
            ) : (
              <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-xl bg-[#D9D9D9] text-black-300">
                <p>{getInitials(rowData?.nama)}</p>
              </div>
            )}
          </div>
        )
      },
    },
    { header: 'NIM', key: 'nim', width: '!min-w-[12rem]' },
    { header: 'Mahasiswa', key: 'nama', width: '!min-w-[12rem]' },
    {
      header: 'Jenis Kelamin',
      key: 'jenis_kelamin',
      width: '!min-w-[12rem]',
      renderCell(rowData) {
        return (
          <p>
            {rowData?.jenis_kelamin?.includes('P') ? 'Perempuan' : 'Laki-laki'}
          </p>
        )
      },
    },
  ]

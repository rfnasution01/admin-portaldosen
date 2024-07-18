import {
  faCalendarDays,
  faCalendarWeek,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type ListMenuType = {
  nama: string
  icon: JSX.Element
  children: string[]
}

export const ListMenu: ListMenuType[] = [
  {
    nama: 'Umum',
    icon: <FontAwesomeIcon icon={faExclamationCircle} />,
    children: [
      'Profil',
      'Tentang Institusi',
      'Tentang Fakultas',
      'Tentang Prodi',
      'Dosen Prodi',
      'Pengumuman',
      'Data Pimpinan',
      'Dokumen Akademik',
      '',
    ],
  },
  {
    nama: 'Jadwal Perkuliahan',
    icon: <FontAwesomeIcon icon={faCalendarWeek} />,
    children: [],
  },
  {
    nama: 'Kalender',
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    children: ['Kalender Akademik', 'Jadwal Minggu Ini', 'Jadwal Semester Ini'],
  },
]

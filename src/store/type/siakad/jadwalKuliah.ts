export type GetSiakadKataBijakType = {
  id: string
  pengarang: string
  isi: string
}

export type GetSiakadJadwalKuliahType = {
  id: string
  kode_mk: string
  nama_mk: string
  sks_mk: string
  nama_kelas: string
  hari: string
  jam_mulai: string
  jam_selesai: string
  status: string
  fakultas: string
  tahun: string
  tahap: string
}

export type GetSiakadJadwalKuliahMahasiswaType = {
  idm: string
  nim: string
  nama: string
  jenis_kelamin: string
  foto: string
}

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
  prodi: string
  tahun: string
  tahap: string
}

export type GetSiakadJadwalKuliahMahasiswaType = {
  id: string
  idm: string
  nim: string
  nama: string
  jenis_kelamin: string
  foto: string
}

export type GetSiakadJadwalKuliahNilaiMahasiswaType = {
  data: SiakadNilaiMahasiswaType[]
  aspek_nilai: SiakadAspekNilaiType[]
}

export type SiakadNilaiMahasiswaType = {
  idm: string
  nim: string
  nama: string
  nilai_akhir: string
  huruf: string
  sks: string
  mutu: string
  nilai_aspek: SiakadAspekNilaiType[]
}

export type SiakadAspekNilaiType = {
  id: string
  nilai: string
  persen: string
  nama: string
}

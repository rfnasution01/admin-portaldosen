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
  ruangan: string
  id_status: number
  jam_selesai: string
  status: string
  fakultas: string
  prodi: string
  tahun: string
  tahap: string
  dosen: string[]
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
  id_mk: string
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

export type GetSiakadBobotNilaiTyoe = {
  nilai: string
  nilai_min: string
  nilai_max: string
}

export type PostJadwalKuliahType = {
  idm: string
  id_mk: string
  id_aspek: string
  nilai: string
}

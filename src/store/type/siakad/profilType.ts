export type GetSiakadProfilType = {
  identitas: SiakadProfilType
  akademik: SiakadAkademikType
}

export type SiakadProfilType = {
  username: string
  nama_lengkap: string
  nama: string
  hp: string
  nidn: string
  email: string
  gambar: string
}

export type SiakadAkademikType = {
  tahun_id: string
  tahun: string
  semester: string
  nama_tahun: string
  kode_prodi: string
  nama_prodi: string
}

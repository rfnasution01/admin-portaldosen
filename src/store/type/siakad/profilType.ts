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
  gelar_depan: string
  gelar_belakang: string
  jenis_kelamin: string
}

export type SiakadAkademikType = {
  tahun_id: string
  tahun: string
  tahap: string
  nama_tahun: string
  kode_prodi: string
  nama_prodi: string
  fakultas: string
  ketua_prodi: string
  dekan: string
}

export type PostProfilBody = {
  nama: string
  gelar_depan: string
  gelar_belakang: string
  hp: string
  nidn: string
  email: string
}

export type GetSiakadIdentitasType = {
  kode_pt: string
  nama_pt: string
  singkatan: string
  alamat: string
  propinsi: string
  kabupaten: string
  kode_pos: string
  fax: string
  email: string
  website: string
}

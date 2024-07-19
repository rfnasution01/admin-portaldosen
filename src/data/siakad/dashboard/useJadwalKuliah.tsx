import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import {
  GetSiakadJadwalKuliahMahasiswaType,
  GetSiakadJadwalKuliahNilaiMahasiswaType,
  GetSiakadJadwalKuliahType,
} from '@/store/type/siakad/jadwalKuliahType'
import {
  useGetSiakadJadwalKuliahDetailQuery,
  useGetSiakadJadwalKuliahMahasiswaQuery,
  useGetSiakadNilaiMahasiswaQuery,
} from '@/store/slices/siakad/jadwalKuliahAPI'

export function useSiakadJadwalKuliah() {
  const navigate = useNavigate()

  const id = localStorage.getItem('editId') ?? ''

  const [jadwalKuliahDetail, setJadwalKuliahDetail] =
    useState<GetSiakadJadwalKuliahType>()

  const {
    data: dataJadwalKuliah,
    isLoading: isLoadingJadwalKuliah,
    isFetching: isFetchingJadwalKuliah,
    isError: isErrorJadwalKuliah,
    error: errorJadwalKuliah,
  } = useGetSiakadJadwalKuliahDetailQuery(
    {
      id_jadwal: id,
    },
    { skip: !id || id === '' },
  )

  const loadingJadwalKuliah = isFetchingJadwalKuliah || isLoadingJadwalKuliah

  useEffect(() => {
    if (dataJadwalKuliah) {
      setJadwalKuliahDetail(dataJadwalKuliah?.data)
    }
  }, [dataJadwalKuliah, id])

  useEffect(() => {
    if (isErrorJadwalKuliah) {
      const errorMsg = errorJadwalKuliah as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })

      if (errorMsg?.data?.message?.includes('Token')) {
        setTimeout(() => {
          Cookies.remove('token')
          navigate(`/login`)
        }, 3000)
      }
    }
  }, [isErrorJadwalKuliah, errorJadwalKuliah])

  // --- Jadwal Kuliah Mahasiswa ---
  const [jadwalKuliahMahasiswa, setJadwalKuliahMahasiswa] = useState<
    GetSiakadJadwalKuliahMahasiswaType[]
  >([])

  const {
    data: dataJadwalKuliahMahasiswa,
    isLoading: isLoadingJadwalKuliahMahasiswa,
    isFetching: isFetchingJadwalKuliahMahasiswa,
  } = useGetSiakadJadwalKuliahMahasiswaQuery(
    {
      id_jadwal: id,
    },
    { skip: !id || id === '' },
  )

  const loadingJadwalKuliahMahasiswa =
    isFetchingJadwalKuliahMahasiswa || isLoadingJadwalKuliahMahasiswa

  useEffect(() => {
    if (dataJadwalKuliahMahasiswa) {
      setJadwalKuliahMahasiswa(dataJadwalKuliahMahasiswa?.data)
    }
  }, [dataJadwalKuliahMahasiswa, id])

  // --- Nilai Mahasiswa ---
  const [nilaiMahasiswa, setNilaiMahasiswa] =
    useState<GetSiakadJadwalKuliahNilaiMahasiswaType>()

  const {
    data: dataNilaiMahasiswa,
    isLoading: isLoadingNilaiMahasiswa,
    isFetching: isFetchingNilaiMahasiswa,
  } = useGetSiakadNilaiMahasiswaQuery(
    {
      id_jadwal: id,
    },
    { skip: !id || id === '' },
  )

  const loadingNilaiMahasiswa =
    isFetchingNilaiMahasiswa || isLoadingNilaiMahasiswa

  useEffect(() => {
    if (dataNilaiMahasiswa) {
      setNilaiMahasiswa(dataNilaiMahasiswa?.data)
    }
  }, [dataNilaiMahasiswa, id])

  return {
    loadingJadwalKuliah,
    jadwalKuliahDetail,
    loadingJadwalKuliahMahasiswa,
    jadwalKuliahMahasiswa,
    loadingNilaiMahasiswa,
    nilaiMahasiswa,
  }
}

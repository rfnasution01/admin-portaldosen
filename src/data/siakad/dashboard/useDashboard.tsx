import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import {
  GetSiakadJadwalKuliahType,
  GetSiakadKataBijakType,
} from '@/store/type/siakad/jadwalKuliahType'
import {
  useGetSiakadJadwalKuliahQuery,
  useGetSiakadKataBijakQuery,
} from '@/store/slices/siakad/jadwalKuliahAPI'

export function useSiakadDashboard() {
  const navigate = useNavigate()

  const [kataBijak, setKataBijak] = useState<GetSiakadKataBijakType>()
  const {
    data: dataKataBijak,
    isLoading: isLoadingKataBijak,
    isFetching: isFetchingKataBijak,
    isError: isErrorKataBijak,
    error: errorKataBijak,
  } = useGetSiakadKataBijakQuery()

  const loadingKataBijak = isFetchingKataBijak || isLoadingKataBijak

  useEffect(() => {
    if (dataKataBijak) {
      setKataBijak(dataKataBijak?.data)
    }
  }, [dataKataBijak])

  useEffect(() => {
    if (isErrorKataBijak) {
      const errorMsg = errorKataBijak as { data?: { message?: string } }

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
  }, [isErrorKataBijak, errorKataBijak])

  //   --- Jadwal Kuliah ---
  const [jadwalKuliah, setJadwalKuliah] =
    useState<GetSiakadJadwalKuliahType[]>()
  const {
    data: dataJadwalKuliah,
    isLoading: isLoadingJadwalKuliah,
    isFetching: isFetchingJadwalKuliah,
  } = useGetSiakadJadwalKuliahQuery()

  const loadingJadwalKuliah = isFetchingJadwalKuliah || isLoadingJadwalKuliah

  useEffect(() => {
    if (dataJadwalKuliah) {
      setJadwalKuliah(dataJadwalKuliah?.data)
    }
  }, [dataJadwalKuliah])

  return {
    kataBijak,
    loadingKataBijak,
    loadingJadwalKuliah,
    jadwalKuliah,
  }
}

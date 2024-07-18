import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { GetSiakadProfilType } from '@/store/type/siakad/profilType'
import { useGetSiakadProfilQuery } from '@/store/slices/siakad/profilAPI'
import { Bounce, toast } from 'react-toastify'

export function useSiakadProfil() {
  const navigate = useNavigate()

  const [profil, setProfil] = useState<GetSiakadProfilType>()
  const {
    data: dataProfil,
    isLoading: isLoadingProfil,
    isFetching: isFetchingProfil,
    isError: isErrorProfil,
    error: errorProfil,
  } = useGetSiakadProfilQuery()

  const loadingProfil = isFetchingProfil || isLoadingProfil

  useEffect(() => {
    if (dataProfil) {
      setProfil(dataProfil?.data)
    }
  }, [dataProfil])

  useEffect(() => {
    if (isErrorProfil) {
      const errorMsg = errorProfil as { data?: { message?: string } }

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
  }, [isErrorProfil, errorProfil])

  return {
    profil,
    loadingProfil,
  }
}

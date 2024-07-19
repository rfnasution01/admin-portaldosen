import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { GetSiakadProfilType } from '@/store/type/siakad/profilType'
import { useGetSiakadProfilQuery } from '@/store/slices/siakad/profilAPI'
import { Bounce, toast } from 'react-toastify'
import { useUpdatePhotoMutation } from '@/store/slices/photoAPI'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { SiakadPhotoSchema } from '@/store/schema/siakad/photoSchema'

export function useSiakadProfil() {
  const navigate = useNavigate()

  const [urls, setUrls] = useState<string>()
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof SiakadPhotoSchema>>({
    resolver: zodResolver(SiakadPhotoSchema),
    defaultValues: {},
  })

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

  useEffect(() => {
    if (profil) {
      form.setValue('photo', profil?.identitas?.gambar)
      setUrls(profil?.identitas?.gambar)
    }
  }, [profil])

  const [
    uploadFileMutation,
    {
      isSuccess: successFile,
      isError: isErrorFile,
      error: errorFile,
      isLoading: loadingFile,
    },
  ] = useUpdatePhotoMutation()

  const handleUploadFoto = async (file: File) => {
    const formatData = new FormData()
    formatData.append('photo', file)

    try {
      await uploadFileMutation(formatData)
    } catch (e) {
      console.error(e)
      toast.error(`Data gagal disimpan`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }

  useEffect(() => {
    if (successFile) {
      toast.success('Berhasil unggah photo!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsShow(false)
      setUrls(null)
      form.reset()
    }
  }, [successFile])

  useEffect(() => {
    if (isErrorFile) {
      const errorMsg = errorFile as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsShow(false)
    }
  }, [isErrorFile, errorFile])

  return {
    profil,
    loadingProfil,
    urls,
    setUrls,
    loadingFile,
    handleUploadFoto,
    form,
    isShow,
    setIsShow,
  }
}

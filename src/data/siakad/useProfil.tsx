import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import {
  GetSiakadIdentitasType,
  GetSiakadProfilType,
} from '@/store/type/siakad/profilType'
import {
  useGetSiakadIdentitasQuery,
  useGetSiakadProfilQuery,
  useUpdateSiakadProfilMutation,
} from '@/store/slices/siakad/profilAPI'
import { Bounce, toast } from 'react-toastify'
import { useUpdatePhotoMutation } from '@/store/slices/photoAPI'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { SiakadPhotoSchema, SiakadProfilSchema } from '@/store/schema/siakad'

export function useSiakadProfil() {
  const navigate = useNavigate()

  const [urls, setUrls] = useState<string>()
  const [isShowPhoto, setIsShowPhoto] = useState<boolean>(false)
  const [isShowProfil, setIsShowProfil] = useState<boolean>(false)

  const formPhoto = useForm<zod.infer<typeof SiakadPhotoSchema>>({
    resolver: zodResolver(SiakadPhotoSchema),
    defaultValues: {},
  })

  const formUpdateProfil = useForm<zod.infer<typeof SiakadProfilSchema>>({
    resolver: zodResolver(SiakadProfilSchema),
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

  const [identitas, setIdentitas] = useState<GetSiakadIdentitasType>()
  const {
    data: dataIdentitas,
    isLoading: isLoadingIdentitas,
    isFetching: isFetchingIdentitas,
  } = useGetSiakadIdentitasQuery()

  const loadingIdentitas = isFetchingIdentitas || isLoadingIdentitas

  useEffect(() => {
    if (dataIdentitas) {
      setIdentitas(dataIdentitas?.data)
    }
  }, [dataIdentitas])

  useEffect(() => {
    if (profil) {
      formPhoto.setValue('photo', profil?.identitas?.gambar)
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
      setIsShowPhoto(false)
      setUrls(null)
      formPhoto.reset()
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
      setIsShowPhoto(false)
    }
  }, [isErrorFile, errorFile])

  // --- Create Edit Profil ---
  const [
    createEditProfil,
    {
      isError: isErrorEditProfil,
      error: errorEditProfil,
      isLoading: isLoadingEditProfil,
      isSuccess: isSuccessEditProfil,
    },
  ] = useUpdateSiakadProfilMutation()

  const handleSubmit = async () => {
    const values = formUpdateProfil.getValues()

    const body = {
      nama: values?.nama,
      gelar_depan: values?.gelar_depan,
      gelar_belakang: values?.gelar_belakang,
      hp: values?.hp,
      nidn: values?.nidn,
      email: values?.email,
    }

    try {
      await createEditProfil({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessEditProfil) {
      toast.success(`Update profil berhasil`, {
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
      setTimeout(() => {
        formUpdateProfil.reset()
        setIsShowProfil(false)
      }, 3000)
    }
  }, [isSuccessEditProfil])

  useEffect(() => {
    if (isErrorEditProfil) {
      const errorMsg = errorEditProfil as { data?: { message?: string } }

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
      setIsShowProfil(false)
    }
  }, [isErrorEditProfil, errorEditProfil])

  useEffect(() => {
    if (profil) {
      formUpdateProfil.setValue('nama', profil?.identitas?.nama)
      formUpdateProfil.setValue('gelar_depan', profil?.identitas?.gelar_depan)
      formUpdateProfil.setValue(
        'gelar_belakang',
        profil?.identitas?.gelar_belakang,
      )
      formUpdateProfil.setValue('hp', profil?.identitas?.hp)
      formUpdateProfil.setValue('nidn', profil?.identitas?.nidn)
      formUpdateProfil.setValue('email', profil?.identitas?.email)
    }
  }, [profil, isSuccessEditProfil])

  return {
    profil,
    loadingProfil,
    urls,
    setUrls,
    loadingFile,
    handleUploadFoto,
    formPhoto,
    isShowPhoto,
    setIsShowPhoto,
    isShowProfil,
    setIsShowProfil,
    formUpdateProfil,
    isLoadingEditProfil,
    handleSubmit,
    identitas,
    loadingIdentitas,
  }
}

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { SiakadTahunAkademikSchema } from '@/store/schema/siakad'
import { useEffect, useState } from 'react'
import { useUpdateTahunAkademikMutation } from '@/store/slices/siakad/tahunAkademikAPI'
import { Bounce, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSiakadProfil } from '../useProfil'

export function useTahunAkademik() {
  const navigate = useNavigate()
  const { profil } = useSiakadProfil()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof SiakadTahunAkademikSchema>>({
    resolver: zodResolver(SiakadTahunAkademikSchema),
    defaultValues: {},
  })

  // --- Create Edit Tahun Akademik ---
  const [
    createEditTahunAkademik,
    {
      isError: isErrorEditTahunAkademik,
      error: errorEditTahunAkademik,
      isLoading: isLoadingEditTahunAkademik,
      isSuccess: isSuccessEditTahunAkademik,
    },
  ] = useUpdateTahunAkademikMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      tahun: values?.tahun,
      tahap: values?.tahap,
      kode_prodi: values?.kode_prodi,
    }

    if (isSubmit && isShow) {
      try {
        await createEditTahunAkademik({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessEditTahunAkademik) {
      toast.success(`Update Tahun Akademik berhasil`, {
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
        setIsShow(false)
        setIsSubmit(false)
        form.reset()
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessEditTahunAkademik])

  useEffect(() => {
    if (isErrorEditTahunAkademik) {
      const errorMsg = errorEditTahunAkademik as { data?: { message?: string } }

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
      setIsShow(false)
      setIsSubmit(false)
    }
  }, [isErrorEditTahunAkademik, errorEditTahunAkademik])

  useEffect(() => {
    if (profil) {
      form.setValue('tahun', profil?.akademik?.tahun)
      form.setValue('tahap', profil?.akademik?.tahap)
      form.setValue('kode_prodi', profil?.akademik?.kode_prodi)
    }
  }, [profil])

  return {
    isShow,
    isSubmit,
    setIsShow,
    setIsSubmit,
    loading: isLoadingEditTahunAkademik,
    handleSubmit,
    form,
  }
}

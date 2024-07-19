import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import {
  GetSiakadBobotNilaiTyoe,
  GetSiakadJadwalKuliahMahasiswaType,
  GetSiakadJadwalKuliahNilaiMahasiswaType,
  GetSiakadJadwalKuliahType,
} from '@/store/type/siakad/jadwalKuliahType'
import {
  useGetBobotNilaiQuery,
  useGetSiakadJadwalKuliahDetailQuery,
  useGetSiakadJadwalKuliahMahasiswaQuery,
  useGetSiakadNilaiMahasiswaQuery,
  useUpdateNilaiMutation,
} from '@/store/slices/siakad/jadwalKuliahAPI'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { SiakadJadwalKuliahSchema } from '@/store/schema/siakad'

export function useSiakadJadwalKuliah() {
  const navigate = useNavigate()

  const [idm, setIdm] = useState<string>()

  const id = localStorage.getItem('editId') ?? ''

  const [jadwalKuliahDetail, setJadwalKuliahDetail] =
    useState<GetSiakadJadwalKuliahType>()

  const form = useForm<zod.infer<typeof SiakadJadwalKuliahSchema>>({
    resolver: zodResolver(SiakadJadwalKuliahSchema),
    defaultValues: {},
  })

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

  // --- Bobot Nilai ---
  const [bobot, setBobot] = useState<GetSiakadBobotNilaiTyoe[]>([])

  const { data: dataBobot } = useGetBobotNilaiQuery()

  useEffect(() => {
    if (dataBobot) {
      setBobot(dataBobot?.data)
    }
  }, [dataBobot])

  // --- Update Nilai ---
  const [
    createNilai,
    {
      isError: isErrorEditNilai,
      error: errorEditNilai,
      isLoading: isLoadingEditNilai,
      isSuccess: isSuccessEditNilai,
    },
  ] = useUpdateNilaiMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      idm: idm,
      id_mk: values?.id_mk,
      id_aspek: values?.id_aspek,
      nilai: form.getValues(`nilai_${idm}`),
    }

    try {
      await createNilai({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessEditNilai) {
      toast.success(`Update nilai berhasil`, {
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
        form.reset()
      }, 3000)
    }
  }, [isSuccessEditNilai])

  useEffect(() => {
    if (isErrorEditNilai) {
      const errorMsg = errorEditNilai as { data?: { message?: string } }

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
    }
  }, [isErrorEditNilai, errorEditNilai])

  return {
    loadingJadwalKuliah,
    jadwalKuliahDetail,
    loadingJadwalKuliahMahasiswa,
    jadwalKuliahMahasiswa,
    loadingNilaiMahasiswa,
    nilaiMahasiswa,
    bobot,
    isLoadingEditNilai,
    handleSubmit,
    form,
    idm,
    setIdm,
  }
}

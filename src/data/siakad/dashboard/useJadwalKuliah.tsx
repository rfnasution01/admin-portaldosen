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
  usePostAjukanNilaiMutation,
  useUpdateNilaiMutation,
} from '@/store/slices/siakad/jadwalKuliahAPI'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { SiakadJadwalKuliahSchema } from '@/store/schema/siakad'
import { rowType } from '@/components/FormComponent/siakad'

export function useSiakadJadwalKuliah() {
  const navigate = useNavigate()

  const id = localStorage.getItem('jadwalID') ?? ''
  const editID = localStorage?.getItem('editID') ?? ''
  const [isShow, setIsShow] = useState<boolean>(false)

  const [postData, setPostData] = useState<{
    id_mk: string
    id_aspek: string
  }>()

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
  const [nilaiMahasiswaTransform, setNilaiMahasiswaTransform] = useState<
    rowType[]
  >([])

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

      const transformResponse = (
        response: GetSiakadJadwalKuliahNilaiMahasiswaType,
        editID: string,
      ) => {
        return response?.data?.map((mahasiswa) => {
          const transformedAspekNilai: { [key: string]: string | null } = {}

          response?.aspek_nilai?.forEach((aspek) => {
            if (aspek?.id === editID) {
              const matchedAspek = mahasiswa?.nilai_aspek?.find(
                (nilaiAspek) => nilaiAspek?.id === aspek?.id,
              )
              transformedAspekNilai[aspek?.nama as string] = matchedAspek
                ? matchedAspek?.nilai
                : null
            }
          })

          return {
            idm: mahasiswa?.idm,
            id_mk: mahasiswa?.id_mk,
            nim: mahasiswa?.nim,
            nama: mahasiswa?.nama,
            nilai_akhir: mahasiswa?.nilai_akhir,
            huruf: mahasiswa?.huruf,
            sks: mahasiswa?.sks,
            mutu: mahasiswa?.mutu,
            ...transformedAspekNilai,
          }
        })
      }

      const nilaiTransform = transformResponse(dataNilaiMahasiswa?.data, editID)
      setPostData({
        id_mk: nilaiTransform?.[0]?.id_mk,
        id_aspek: editID,
      })

      setNilaiMahasiswaTransform(
        transformResponse(dataNilaiMahasiswa?.data, editID),
      )
    }
  }, [dataNilaiMahasiswa, id, editID])

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

  const handleSubmit = async (idm: string) => {
    const body = {
      idm: idm ?? '',
      id_mk: postData?.id_mk ?? '',
      id_aspek: postData?.id_aspek ?? '',
      nilai: form.watch(`nilai_${idm}_${editID}`) ?? '',
    }

    try {
      localStorage.setItem('idm', idm)
      await createNilai({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

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

  // --- Ajukan Nilai ---
  const [
    createAjukan,
    {
      isError: isErrorAjukanNilai,
      error: errorAjukanNilai,
      isLoading: isLoadingAjukanNilai,
      isSuccess: isSuccessAjukanNilai,
    },
  ] = usePostAjukanNilaiMutation()

  const handleSubmitAjukan = async () => {
    const body = {
      id_jadwal: id,
    }

    try {
      await createAjukan({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessAjukanNilai) {
      toast.success(`Ajukan nilai berhasil`, {
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
    }
  }, [isSuccessAjukanNilai])

  useEffect(() => {
    if (isErrorAjukanNilai) {
      const errorMsg = errorAjukanNilai as { data?: { message?: string } }

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
  }, [isErrorAjukanNilai, errorAjukanNilai])

  const isNotDraft = jadwalKuliahDetail?.id_status === 1

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
    nilaiMahasiswaTransform,
    handleSubmitAjukan,
    isLoadingAjukanNilai,
    isShow,
    setIsShow,
    isNotDraft,
    isSuccessEditNilai,
  }
}

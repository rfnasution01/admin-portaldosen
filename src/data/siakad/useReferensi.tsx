import { useGetProdiQuery } from '@/store/slices/referensiAPI'
import { GetProdiType } from '@/store/type/referensiType'
import { useEffect, useState } from 'react'

export function useReferensi() {
  const [prodi, setProdi] = useState<GetProdiType[]>([])

  const {
    data: dataProdi,
    isFetching: isFetchingProdi,
    isLoading: isLoadingProdi,
    isSuccess: isSuccessProdi,
  } = useGetProdiQuery()

  useEffect(() => {
    if (!isFetchingProdi) {
      if (dataProdi?.meta?.page > 1) {
        setProdi((prevData) => [...prevData, ...(dataProdi?.data ?? [])])
      } else {
        setProdi([...(dataProdi?.data ?? [])])
      }
    }
  }, [dataProdi])

  let listProdiOption = []
  if (isSuccessProdi) {
    listProdiOption = prodi.map((item) => {
      return {
        value: item?.kode_prodi,
        label: item?.nama_prodi,
      }
    })
  }
  return {
    isLoadingProdi,
    isFetchingProdi,
    listProdiOption,
  }
}

import { GetSiakadJadwalKuliahNilaiMahasiswaType } from '@/store/type/siakad/jadwalKuliahType'
import { Fragment, useState } from 'react'
import FormJadwalKuliah, {
  rowType,
} from '../FormComponent/siakad/FormJadwalKuliah'
import LoadingGif from '@/assets/imgs/loading.gif'
import { UseFormReturn } from 'react-hook-form'
import clsx from 'clsx'

export function TableMahasiswaPerAspek({
  response,
  currentPage,
  pageSize,
  nilaiMahasiswa,
  handleSubmit,
  form,
  isNotDraft,
  isSuccessEditNilai,
}: {
  nilaiMahasiswa: GetSiakadJadwalKuliahNilaiMahasiswaType
  response: rowType[]
  currentPage: number
  pageSize: number
  handleSubmit: (idm: string) => Promise<void>
  form: UseFormReturn
  isNotDraft: boolean
  isSuccessEditNilai: boolean
}) {
  const editID = localStorage?.getItem('editID') ?? ''

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean
  }>({})

  const key = nilaiMahasiswa?.aspek_nilai?.find(
    (item) => item?.id === editID,
  )?.nama

  const handleLoading = (idm: string, isLoading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [idm]: isLoading }))
  }

  const isValueEmpty = (value: string) => {
    return (
      value === null ||
      value === undefined ||
      value === '0.00' ||
      value === '0' ||
      value === ''
    )
  }

  return (
    <div
      className={`h-full w-full overflow-visible rounded-2xl bg-white phones:h-auto`}
    >
      <div
        className={`scrollbar flex h-full flex-col overflow-auto phones:h-auto`}
        style={{ scrollbarGutter: 'stable' }}
      >
        <table className="h-full flex-1 border-collapse overflow-y-auto border border-black-300 bg-white text-[2rem] phones:h-auto">
          <thead className="relative z-10 align-top leading-medium text-neutral-white">
            <tr>
              <th className="px-6 py-6 sticky top-0 w-[5%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white">
                #
              </th>
              <th className="px-6 py-6 sticky top-0 w-[15%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white">
                NIM
              </th>
              <th className="px-6 py-6 sticky top-0 w-[40%] border-b-2 bg-primary-900 text-left text-center align-middle uppercase text-white">
                Mahasiswa
              </th>
              {nilaiMahasiswa?.aspek_nilai
                ?.filter((item) => item?.id === editID)
                ?.map((item, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-6 sticky top-0 w-[10%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white"
                  >
                    <div className="flex flex-col">
                      <p>{item?.nama} </p>
                      <p>({item?.persen}%)</p>
                    </div>
                  </th>
                ))}
              <th className="px-6 py-6 sticky top-0 w-[30%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white">
                Koreksi Nilai
              </th>
            </tr>
          </thead>
          <tbody>
            {response?.map((row, rowIndex) => (
              <Fragment key={rowIndex}>
                <tr
                  className={clsx(
                    'border-b border-black-300 text-neutral-black transition-all ease-in hover:cursor-pointer hover:bg-yellow-100',
                    {
                      'bg-neutral-cell': isValueEmpty(row?.[key]),
                    },
                  )}
                >
                  <td className="px-24 py-12 text-center align-middle leading-medium">
                    {currentPage * pageSize + (rowIndex + 1 - pageSize)}
                  </td>
                  <td className="px-24 py-12 text-center align-middle leading-medium ">
                    {row?.nim ?? '-'}
                  </td>
                  <td className="px-24 py-12 text-left align-middle leading-medium ">
                    {row?.nama ?? '-'}
                  </td>
                  {nilaiMahasiswa.aspek_nilai
                    ?.filter((item) => item?.id === editID)
                    ?.map((aspek, idx) => (
                      <td
                        key={idx}
                        className="px-24 py-12 text-center align-middle leading-medium"
                      >
                        {row[aspek.nama] ?? '-'}
                      </td>
                    ))}
                  <td className="px-24 py-12 text-center align-middle leading-medium ">
                    {loadingStates[row.idm] ? (
                      <img src={LoadingGif} alt="Loading" />
                    ) : (
                      <FormJadwalKuliah
                        form={form}
                        isLoading={loadingStates[row.idm]}
                        handleSubmit={handleSubmit}
                        row={row}
                        setLoading={handleLoading}
                        isNotDraft={isNotDraft}
                        editID={editID}
                        keyString={key}
                        isSuccessEditNilai={isSuccessEditNilai}
                      />
                    )}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

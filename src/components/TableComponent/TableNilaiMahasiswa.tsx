import { GetSiakadJadwalKuliahNilaiMahasiswaType } from '@/store/type/siakad/jadwalKuliahType'
import { Loading } from '../Loading'
import { Fragment } from 'react'
import clsx from 'clsx'

export function TableMahasiswa({
  response,
  loading,
  currentPage,
  pageSize,
}: {
  response: GetSiakadJadwalKuliahNilaiMahasiswaType
  loading: boolean
  currentPage: number
  pageSize: number
}) {
  const remainingWidth = 100 - (60 + (response?.aspek_nilai?.length || 0) * 7)

  const transformResponse = (
    response: GetSiakadJadwalKuliahNilaiMahasiswaType,
  ) => {
    return response?.data?.map((mahasiswa) => {
      const transformedAspekNilai: { [key: string]: string | null } = {}

      response?.aspek_nilai?.forEach((aspek) => {
        const matchedAspek = mahasiswa?.nilai_aspek?.find(
          (nilaiAspek) => nilaiAspek?.id === aspek?.id,
        )
        transformedAspekNilai[aspek?.nama as string] = matchedAspek
          ? matchedAspek?.nilai
          : null
      })

      return {
        idm: mahasiswa?.idm,
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
      {loading ? (
        <Loading width="6.4rem" height="6.4rem" />
      ) : (
        <div
          className={`scrollbar flex h-full flex-col overflow-auto phones:h-auto`}
          style={{ scrollbarGutter: 'stable' }}
        >
          {/* ----- No Data/Fallback UI ----- */}
          <table className="h-full flex-1 border-collapse overflow-y-auto border border-black-300 bg-white text-[2rem] phones:h-auto">
            <thead className="relative z-10 align-top leading-medium text-neutral-white">
              <tr>
                <th className="px-6 py-6 sticky top-0 w-[5%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white">
                  #
                </th>
                <th className="px-6 py-6 sticky top-0 w-[15%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white">
                  NIM
                </th>
                <th
                  className={`px-6 py-6 sticky top-0 text-center align-middle w-[${remainingWidth}%] border-b-2 bg-primary-900 text-left uppercase text-white`}
                >
                  Mahasiswa
                </th>
                {response?.aspek_nilai?.map((item, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-6 sticky top-0 w-[7%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white"
                  >
                    <div className="flex flex-col">
                      <p>{item?.nama} </p>
                      <p>({item?.persen}%)</p>
                    </div>
                  </th>
                ))}
                <th className="px-6 py-6 sticky top-0 w-[5%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white">
                  NA
                </th>
                <th className="px-6 py-6 sticky top-0 w-[5%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white">
                  H
                </th>
                <th className="px-6 py-6 sticky top-0 w-[5%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white">
                  SKS
                </th>
                <th className="px-6 py-6 sticky top-0 w-[5%] border-b-2 bg-primary-900 text-center align-middle uppercase text-white">
                  M
                </th>
              </tr>
            </thead>
            <tbody>
              {transformResponse(response)?.map((row, rowIndex) => (
                <Fragment key={rowIndex}>
                  <tr
                    className={
                      'border-b border-black-300 text-neutral-black transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-yellow-100'
                    }
                  >
                    <td className="px-24 py-12 text-center align-top leading-medium">
                      {currentPage * pageSize + (rowIndex + 1 - pageSize)}
                    </td>
                    <td className="px-24 py-12 text-center align-top leading-medium ">
                      {row?.nim ?? '-'}
                    </td>
                    <td className="px-24 py-12 text-center align-top leading-medium ">
                      {row?.nama ?? '-'}
                    </td>
                    {/* Render each aspek_nilai dynamically */}
                    {response.aspek_nilai.map((aspek, idx) => (
                      <td
                        key={idx}
                        className={clsx(
                          'px-24 py-12 text-center align-top leading-medium',
                          {
                            'bg-neutral-cell': isValueEmpty(row[aspek?.nama]),
                          },
                        )}
                      >
                        {row[aspek?.nama] ?? '-'}
                      </td>
                    ))}
                    <td className="px-24 py-12 text-center align-top leading-medium ">
                      {row?.nilai_akhir ?? '-'}
                    </td>
                    <td className="px-24 py-12 text-center align-top leading-medium ">
                      {row?.huruf ?? '-'}
                    </td>
                    <td className="px-24 py-12 text-center align-top leading-medium ">
                      {row?.sks ?? '-'}
                    </td>
                    <td className="px-24 py-12 text-center align-top leading-medium ">
                      {row?.mutu ?? '-'}
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

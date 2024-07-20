import { Fragment, useRef } from 'react'
import printJS from 'print-js'
import { GetSiakadJadwalKuliahNilaiMahasiswaType } from '@/store/type/siakad/jadwalKuliahType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

export function PrintHasil({
  response,
  mataKuliah,
}: {
  response: GetSiakadJadwalKuliahNilaiMahasiswaType
  mataKuliah: string
}) {
  const printRef = useRef<HTMLDivElement>(null)
  // const totalPage = Math.ceil((profil?.length + 2) / 15)

  const handlePrint = () => {
    if (printRef.current) {
      printJS({
        printable: printRef.current.innerHTML,
        type: 'raw-html',
        style: `
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              body, html {
                height: 100%;
                margin: 0;
                padding: 0;
              }
              .header-space {
                height: 136px;
                padding-bottom: 32px;
              }
              .footer-space {
                height: 50px;
                padding: 0 16px 0 16px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              }
              .footer-space p {
                font-style: italic
              }
              .content {
                padding: 16px 16px 0 16px;
                display: flex;
                flex-direction: column;
                gap: 16px;
              }
              .header {
                display: flex;
                flex-direction: row;
                gap: 16px;
                padding: 16px;
                border-bottom: 1px solid black;
              }
              .header img { 
                width: 120px;
                height: 120px; 
              }
              .header-text {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 0;
                justify-content: center;
                align-items: center; 
              }
              .header-text p {
                margin: 0;
                padding: 0;
              }
              .content-header {
                font-size: 18px;
                text-align: center;
                text-transform: uppercase;
                font-weight: 700;
              }
              .section-content {
                display: flex;
                flex-direction: column;
                gap: 0;
              }
              .section-content p {
                margin: 0;
                padding: 0;
              }
              .title {
                font-size: 22px;
                font-weight: 700;
                text-align: center;
                text-transform: uppercase;
              }
              .description {
                font-size: 20px;
                text-align: center;
              }
              .title-header {
                font-size: 20px;
                text-align: center;
                text-transform: uppercase;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
              }
              .table-border {
                border: 1px solid black;
                padding: 0 4px 0 4px;
              } 
              .table-border p {
                font-size: 12px;
              } 
              .bold {
                font-weight: 700;
              }
              .mengetahui {
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: end;
              }
              .kadis {
                dispay: flex;
                flex-direction: column;
                gap: 0;
                flex: 1;
              }
              kadis p {
                padding: 0;
                margin: 0;
              }
              .kepsek {
                dispay: flex;
                flex-direction: column;
                gap: 0;
                flex: 1;
              }
              kepsek p {
                padding: 0;
                margin: 0;
              }
                .diterbitkan {
                display: flex;
                flex-direction: row;
                width: 100%;
              }
              .diterbitkan p {
                margin: 0;
                padding: 0;  
              }
              .diterbitkan {
                width: 50%;
              }
              .diterbitkan {
                width: 50%;
              }
            }
        `,
      })
    }
  }

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

  return (
    <>
      <div ref={printRef} style={{ display: 'none' }}>
        <table>
          {/* <thead>
            <tr>
              <td>
                <div className="header-space">
                  <div className="header">
                    <img src="/img/batubara.png" alt="PPDB" />
                    <div className="header-text">
                      <p className="title-header">
                        Pemerintah Kabupaten Batu Bara
                      </p>
                      <p className="title">Dinas Pendidikan</p>
                      <p className="title">{sekolah}</p>
                      <p className="description">Alamat: {alamat}</p>
                    </div>
                    <img src="/img/tutwuri.png" alt="PPDB" />
                  </div>
                </div>
              </td>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <td>
                <div className="content">
                  <div className="section-content">
                    <p className="content-header">
                      Rekap Hasil Nilai Mahasiswa
                    </p>
                    <p className="content-header">Mata Kuliah {mataKuliah}</p>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th className="table-border">#</th>
                        <th className="table-border">NIM</th>
                        <th className="table-border">Mahasiswa</th>
                        {response?.aspek_nilai?.map((item, idx) => (
                          <th key={idx} className="table-border">
                            <div className="flex flex-col">
                              <p>{item?.nama} </p>
                              <p>({item?.persen}%)</p>
                            </div>
                          </th>
                        ))}
                        <th className="table-border">NA</th>
                        <th className="table-border">H</th>
                        <th className="table-border">SKS</th>
                        <th className="table-border">M</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transformResponse(response)?.map((row, rowIndex) => (
                        <Fragment key={rowIndex}>
                          <tr key={rowIndex}>
                            <td className="table-border">
                              <p>{rowIndex + 1}</p>
                            </td>
                            <td className="table-border">
                              <p>{row?.nim}</p>
                            </td>
                            <td className="table-border">
                              <p>{row?.nama}</p>
                            </td>
                            {response.aspek_nilai.map((aspek, idx) => (
                              <td key={idx} className="table-border">
                                {row[aspek.nama] ?? '-'}
                              </td>
                            ))}
                            <td className="table-border">
                              <p>{row?.nilai_akhir}</p>
                            </td>
                            <td className="table-border">
                              <p>{row?.huruf}</p>
                            </td>
                            <td className="table-border">
                              <p>{row?.sks}</p>
                            </td>
                            <td className="table-border">
                              <p>{row?.mutu}</p>
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className="footer-space">
                  <p>Di cetak dari https://dosen.sari-mutiara.ac.id/</p>
                  {/* <p>
                    Halaman {profil?.length} / {totalPage}
                  </p> */}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          handlePrint()
        }}
        type="button"
        className="flex items-center gap-12"
      >
        <FontAwesomeIcon icon={faPrint} />
        <p>Print</p>
      </button>
    </>
  )
}

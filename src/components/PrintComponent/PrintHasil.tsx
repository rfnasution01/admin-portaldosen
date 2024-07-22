import { Fragment, useRef } from 'react'
import printJS from 'print-js'
import {
  GetSiakadJadwalKuliahNilaiMahasiswaType,
  GetSiakadJadwalKuliahType,
} from '@/store/type/siakad/jadwalKuliahType'
import {
  GetSiakadIdentitasType,
  GetSiakadProfilType,
} from '@/store/type/siakad/profilType'

export function PrintHasil({
  response,
  jadwalKuliahDetail,
  identitas,
  profil,
}: {
  response: GetSiakadJadwalKuliahNilaiMahasiswaType
  jadwalKuliahDetail: GetSiakadJadwalKuliahType
  identitas: GetSiakadIdentitasType
  profil: GetSiakadProfilType
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
              .footer-space {
                height: 50px;
                padding: 0 16px 0 16px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              }
              .footer-space p {
                font-style: italic;
                font-size: 10px;
              }
              .header {
                padding: 16px;
              }
              .header p {
                padding: 0;
                margin: 0;
                font-size: 16px;
                text-transform: uppercase;
                text-align: center;
              }
              .content {
                display: flex;
                flex-direction: column;
                gap: 32px;
                padding: 0 16px 0 16px;
              }
              .section-content {
                display: flex;
                flex-direction: column;
                gap: 0;
                padding: 16px;
              }
              .text-parent {
                display: flex;
                flex-direction: row;
                gap: 16px;
              }
              .text-section {
                display: flex;
                flex-direction: row;
                gap: 16px;
                flex: 1;
              }
              .section-content p {
                padding: 0;
                margin: 0;
                font-size: 10px;
              }
              .text-width1 {
                width: 30%;
              }
              .text-width2 {
                width: 70%;
              }
              .text-width3 {
                width: 50%;
              }
              .text-width4 {
                width: 50%;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
              }
              .table-border {
                border: 1px solid black;
              } 
              .table-border p {
                font-size: 10px;
                padding: 2px;
                margin: 0;
              }
              .width-stable {
                width: 7%;
                text-align: center;
              }
              .width-no {
                width: 4%;
                text-align: center;
              }
              .text-center {
                text-align: center;
              }
              .flex-col {
                display: flex;
                flex-direction: column;
                gap: 0;
                padding: 0;
                margin: 0;
              }
              .flex-col p {
                padding: 0;
                margin: 0;
              }
              .section-footer {
                width: 100%;
                border: 1px solid black;
                font-size: 10px;
                display: flex;
                flex-direction: row;
                page-break-inside: avoid;
              }
              
              .padding {
                display: flex;
                flex-direction: column;
                gap: 0;
                width: 50%;
                font-size: 10px;
                padding: 4px 4px 32px 4px;
              }

              .padding p {
                padding: 0;
                margin: 0;
              }

              .pl {
                display: flex;
                flex-direction: column;
                gap: 0;
                padding: 0 12px 0 12px;
                font-size: 10px;
              }
              .pl p {
                padding: 0;
                margin: 0;
              }
              .wfull {
                display: flex;
                flex-direction: row;
                width: 100%;
                gap: 32px;
              }
              .w25 {
                width: 40%;
              }
              .w35 {
                width: 60%;
              }
              .header-utama {
                display: flex;
                flex-direction: column;
              }
              .kop {
                display: flex;
                flex-direction: row;
                gap: 30;
                padding: 16px 16px 8px 16px;
                border-bottom: 1px solid black;

              }
              .kop img {
                width: 120px;
                height: 120px;
              }
              .kop-title {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 70%;
              }
              .kop-title p {
                padding: 0; 
                margin: 0;
              }
              .text-besar {
                font-size: 20px;
                text-transform: uppercase;
                text-align: center;
              }
              .text-kecil {
                font-size: 14px;
              }
              .text-bold {
                font-weight: bold;
              }
              .kaprodi {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 30px;
                width: 50%;
                font-size: 10px;
                padding: 4px 4px 32px 4px;
                border-left: 1px solid black;
              }
              .kaprodi {
                padding: 0;
                margin: 0;
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
          <thead>
            <tr>
              <td>
                <div className="header-utama">
                  <div className="kop">
                    <img src="/logo.png" alt="Logo" />
                    <div className="kop-title">
                      <p className="text-besar">
                        Kementrian Pendidikan Dan Kebudayaan
                      </p>
                      <p className="text-besar text-bold">
                        {identitas?.nama_pt}
                      </p>
                      <p className="text-besar text-bold">
                        {profil?.akademik?.fakultas}
                      </p>
                      <p className="text-besar text-bold">
                        {jadwalKuliahDetail?.prodi}
                      </p>
                      <p className="text-kecil">{identitas?.alamat}</p>
                      <p className="text-kecil">
                        Telp/Fax: {identitas?.fax}. Email: {identitas?.email}
                      </p>
                    </div>
                  </div>
                  <div className="header">
                    <p>Daftar Nilai Akhir</p>
                  </div>
                  <div className="section-content">
                    <div className="text-parent">
                      <div className="text-section">
                        <p className="text-width1">Mata Kuliah</p>
                        <p className="text-width2">
                          : {jadwalKuliahDetail?.nama_mk}
                        </p>
                      </div>
                      <div className="text-section">
                        <p className="text-width3">Tahun Ajaran/ Tahapan</p>
                        <p className="text-width4">
                          : {jadwalKuliahDetail?.tahun}/{' '}
                          {jadwalKuliahDetail?.tahap}
                        </p>
                      </div>
                    </div>
                    <div className="text-parent">
                      <div className="text-section">
                        <p className="text-width1">Fakultas</p>
                        <p className="text-width2">
                          : {jadwalKuliahDetail?.fakultas}
                        </p>
                      </div>
                      <div className="text-section">
                        <p className="text-width3">Kelas Perkuliahan</p>
                        <p className="text-width4">
                          : {jadwalKuliahDetail?.nama_kelas}
                        </p>
                      </div>
                    </div>
                    <div className="text-parent">
                      <div className="text-section">
                        <p className="text-width1">Program Studi</p>
                        <p className="text-width2">
                          : {jadwalKuliahDetail?.prodi}
                        </p>
                      </div>
                      <div className="text-section">
                        <p className="text-width3">Ruangan</p>
                        <p className="text-width4">
                          : {jadwalKuliahDetail?.ruangan}
                        </p>
                      </div>
                    </div>
                    <div className="text-parent">
                      <div className="text-section">
                        <p className="text-width1">Dosen</p>
                        <p className="text-width2">
                          : {profil?.identitas?.nama}
                        </p>
                      </div>
                      <div className="text-section">
                        <p className="text-width3">Hari / Sesi</p>
                        <p className="text-width4">
                          : {jadwalKuliahDetail?.hari ?? '-'} /{' '}
                          {jadwalKuliahDetail?.jam_mulai} -{' '}
                          {jadwalKuliahDetail?.jam_selesai}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="content">
                  <table>
                    <thead>
                      <tr>
                        <th className="table-border width-no">#</th>
                        <th className="table-border">
                          <p>NIM</p>
                        </th>
                        <th className="table-border">
                          <p>Mahasiswa</p>
                        </th>
                        {response?.aspek_nilai?.map((item, idx) => (
                          <th key={idx} className="table-border width-stable">
                            <div className="flex-col">
                              <p>{item?.nama}</p>
                              <p> {item?.persen}%</p>
                            </div>
                          </th>
                        ))}
                        <th className="table-border width-stable">
                          <p>NA</p>
                        </th>
                        <th className="table-border width-stable">
                          <p>H</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transformResponse(response)?.map((row, rowIndex) => (
                        <Fragment key={rowIndex}>
                          <tr key={rowIndex}>
                            <td className="table-border text-center">
                              <p>{rowIndex + 1}</p>
                            </td>
                            <td className="table-border text-center">
                              <p>{row?.nim}</p>
                            </td>
                            <td className="table-border">
                              <p>{row?.nama}</p>
                            </td>
                            {response.aspek_nilai.map((aspek, idx) => (
                              <td
                                key={idx}
                                className="table-border text-center"
                              >
                                <p>{row[aspek.nama] ?? '-'}</p>
                              </td>
                            ))}
                            <td className="table-border text-center">
                              <p>{row?.nilai_akhir}</p>
                            </td>
                            <td className="table-border text-center">
                              <p>{row?.huruf}</p>
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>

                  <div className="section-footer">
                    <div className="padding">
                      <p>Medan</p>
                      <div className="wfull">
                        <p className="w25">Dosen Penguji</p>
                        <p className="w35">Tanda Tangan</p>
                      </div>
                      <div className="pl">
                        {jadwalKuliahDetail?.dosen
                          ?.filter((item) => item !== '')
                          ?.map((item, idx) => (
                            <div className="wfull" key={idx}>
                              <p className="w25">
                                {idx + 1}. {item}
                              </p>
                              <p className="w35">
                                {idx + 1}.......................
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="kaprodi">
                      <p>Ketua Program Studi</p>
                      <p>{profil?.akademik?.ketua_prodi}</p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className="footer-space">
                  <p>Di cetak dari https://dosen.sari-mutiara.ac.id/</p>
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
        className="flex items-center gap-12 text-primary-inactive hover:text-primary-active"
      >
        <p>Cetak Hasil</p>
      </button>
    </>
  )
}

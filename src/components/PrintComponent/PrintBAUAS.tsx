import { useRef } from 'react'
import printJS from 'print-js'
import {
  GetSiakadBobotNilaiTyoe,
  GetSiakadJadwalKuliahNilaiMahasiswaType,
  GetSiakadJadwalKuliahType,
} from '@/store/type/siakad/jadwalKuliahType'
import {
  GetSiakadIdentitasType,
  GetSiakadProfilType,
} from '@/store/type/siakad/profilType'

export function PrintBAUAS({
  response,
  jadwalKuliahDetail,
  identitas,
  profil,
  bobot,
}: {
  response: GetSiakadJadwalKuliahNilaiMahasiswaType
  jadwalKuliahDetail: GetSiakadJadwalKuliahType
  identitas: GetSiakadIdentitasType
  profil: GetSiakadProfilType
  bobot: GetSiakadBobotNilaiTyoe[]
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
                padding: 0 64px 0 64px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              }
              .footer-space p {
                font-style: italic;
                font-size: 10px;
              }
              .header {
                padding: 16px 16px 0 16px;
              }
                
              .header p {
                padding: 0;
                margin: 0;
                font-size: 16px;
                text-transform: uppercase;
                text-align: center;
                font-weight: bold;
              }
              .content {
                display: flex;
                flex-direction: column;
                gap: 12px;
                padding: 0 64px 0 64px;
              }

              .content p {
                padding: 0;
                margin: 0;
              }
              
              .header-utama {
                display: flex;
                flex-direction: column;
                width: 100%;
              }
              .kop {
                display: flex;
                flex-direction: row;
                gap: 30;
                padding: 64px 64px 8px 64px;
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
                width: 100%;
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
               table { 
                width: 100%; 
                border-collapse: collapse; 
              }
              .table-border {
                background-color: #CCCCCC;
                text-align: left;
                padding-left: 4px;
              } 
              .width-label {
                width: 40%;
              }
              .width-value {
                width: 60%;
              }
              .table-border p {
                font-size: 10px;
                padding: 2px 4px;
                margin: 0;
              }
              .bg-slate {
                background-color: #eeeeee;
              }
              .penguji {
                display: flex;
                flex-direction: row;
                background-color: #eeeeee;
                width: 100%;
              }
              .penguji-child {
                display: flex;
                flex-direction: column;
                gap: 32px;
                padding: 8px;
                flex: 1;
              }
              .penguji-child p {
                padding: 0;
                margin: 0;
              }
              .border-left {
                border-left: 1px solid black;
              }
              .border-right {
                border-right: 1px solid black;
              }
              .border-bottom {
                border-bottom: 1px solid black;
              }
              .border-top {
                border-top: 1px solid black;
              }
              .text-center {
                text-align: center;
              }
              .diketahui {
                display: flex;
                flex-direction: column;
                gap: 4px;
              }         
              .diketahui p {
                padding: 0;
                margin: 0;
              }
              .penguji-diketahui {
                display: flex;
                flex-direction: row;
                width: 100%;
              }
              .penjelasan {
                display: flex;
                flex-direction: row;
                width: 100%;
                background-color: #CCCCCC;
              }
              .penjelasan-child {
                display: flex;
                flex-direction: column;
                flex: 1;
                padding: 8px;
              }  
              .penjelasan-lanjutan {
                display: flex;
                flex-direction: row;
              }
              .penjelasan-lanjutan p {
                padding: 0;
                margin: 0;
              }  
              .w-13 {
                width: 40%;
              }
              .w-23{
                width: 60%;
              }   
              .wa-13 {
                width: 60%;
              }
              .wa-23{
                width: 30%;
              }            
            }
        `,
      })
    }
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
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="content">
                  <div className="header">
                    <p>Berita Acara Ujian Akhir Semester (BA UAS)</p>
                  </div>

                  <p>
                    Pada hari ............... Tanggal
                    ........................... telah dilaksanakan Ujian Akhir
                    Semester (UAS) untuk tahun ajaran 2023 - Genap dengan mata
                    kuliah sebagai berikut:
                  </p>

                  <table>
                    <thead></thead>
                    <tbody>
                      <tr>
                        <th className="table-border width-label">
                          Kode Mata Kuliah
                        </th>
                        <td className="table-border width-value">
                          : {jadwalKuliahDetail?.kode_mk}
                        </td>
                      </tr>
                      <tr>
                        <th className="table-border width-label">
                          Nama Mata Kuliah
                        </th>
                        <td className="table-border width-value">
                          : {jadwalKuliahDetail?.nama_mk}
                        </td>
                      </tr>
                      <tr>
                        <th className="table-border width-label">
                          Dosen Penguji
                        </th>
                        <td className="table-border width-value">
                          : {profil?.identitas?.nama}
                        </td>
                      </tr>
                      <tr>
                        <th className="table-border width-label">
                          Program Studi
                        </th>
                        <td className="table-border width-value">
                          : {jadwalKuliahDetail?.prodi}
                        </td>
                      </tr>
                      <tr>
                        <th className="table-border width-label">Semester</th>
                        <td className="table-border width-value">:</td>
                      </tr>
                      <tr>
                        <th className="table-border width-label">Pukul</th>
                        <td className="table-border width-value">:</td>
                      </tr>
                      <tr>
                        <th className="table-border width-label">
                          Ruangan Ujian
                        </th>
                        <td className="table-border width-value">
                          : {jadwalKuliahDetail?.ruangan}
                        </td>
                      </tr>
                      <tr>
                        <th className="table-border width-label">
                          Jumlah Peserta Yang Hadir
                        </th>
                        <td className="table-border width-value">:</td>
                      </tr>
                      <tr>
                        <th className="table-border width-label">
                          Jumlah Peserta Yang Tidak Hadir
                        </th>
                        <td className="table-border width-value">:</td>
                      </tr>
                      <tr>
                        <th className="table-border width-label">
                          Keadaan Ujian
                        </th>
                        <td className="table-border width-value">:</td>
                      </tr>
                      <tr>
                        <th className="table-border width-label">
                          Peserta Yang Curang
                        </th>
                        <td className="table-border width-value">:</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="penguji">
                    <div className="penguji-child border-left border-top border-bottom">
                      <p className="text-center">Dosen Penguji</p>
                      <p className="text-center">{profil?.identitas?.nama}</p>
                    </div>
                    <div className="penguji-child border-left border-top border-bottom">
                      <p className="text-center">Pengawas Ujian 1</p>
                      <p className="text-center">.....................</p>
                    </div>
                    <div className="penguji-child border-left border-top border-bottom border-right">
                      <p className="text-center">Pengawas Ujian 2</p>
                      <p className="text-center">.....................</p>
                    </div>
                  </div>

                  <p>Medan, .....................</p>

                  <div className="penguji-diketahui">
                    <div className="penguji-child border-left border-top border-bottom">
                      <div className="diketahui">
                        <p>Diketahui</p>
                        <p>Ketua Program Studi</p>
                      </div>
                      <p>{profil?.akademik?.ketua_prodi}</p>
                    </div>
                    <div className="penguji-child border-left border-top border-bottom border-right">
                      <div className="diketahui">
                        <p>Diketahui</p>
                        <p>Dekan</p>
                      </div>
                      <p>{profil?.akademik?.dekan}</p>
                    </div>
                  </div>

                  <div className="penjelasan">
                    <div className="penjelasan-child">
                      <p>Penjelasan Penilaian</p>

                      {response?.aspek_nilai?.map((item, idx) => (
                        <div className="penjelasan-lanjutan" key={idx}>
                          <p className="w-13">{item?.nama}</p>
                          <p className="w-23">
                            = Nilai{' '}
                            {item?.nama === 'UAS'
                              ? 'Ujian Akhir Semester'
                              : item?.nama === 'UTS'
                                ? 'Ujian Tengah Semester'
                                : item?.nama}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="penjelasan-child">
                      <p>Distribusi Nilai (N) ke dalam Huruf (H)</p>

                      {bobot?.map((item, idx) => (
                        <div className="penjelasan-lanjutan" key={idx}>
                          <p className="wa-23">
                            {item?.nilai_min} - {item?.nilai_max}
                          </p>
                          <p className="wa-13"> = Nilai Huruf {item?.nilai}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="diketahui">
                    <p>Keterangan</p>
                    <p>
                      1. Peserta Ujian Akhir Semester Harus Membawa Kartu Ujian
                    </p>
                    <p>
                      2. Jika Namanya tidak terdaftar di Absensi UAS, maka
                      mahasiswa tersebut tidak diperbolehkan mengikuti Ujian
                    </p>
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
        <p>Cetak BA UAS</p>
      </button>
    </>
  )
}

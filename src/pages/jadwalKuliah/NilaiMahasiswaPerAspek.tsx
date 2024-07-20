import { TableMahasiswaPerAspek } from '@/components/TableComponent/TableNilaiMahasiswaPerAspek'
import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'

export default function NilaiMahasiswaPerAspek() {
  const {
    nilaiMahasiswaTransform,
    nilaiMahasiswa,
    form,
    handleSubmit,
    isNotDraft,
    isSuccessEditNilai,
  } = useSiakadJadwalKuliah()

  return (
    <>
      <TableMahasiswaPerAspek
        response={nilaiMahasiswaTransform}
        pageSize={1000}
        currentPage={1}
        nilaiMahasiswa={nilaiMahasiswa}
        handleSubmit={handleSubmit}
        form={form}
        isNotDraft={isNotDraft}
        isSuccessEditNilai={isSuccessEditNilai}
      />
    </>
  )
}

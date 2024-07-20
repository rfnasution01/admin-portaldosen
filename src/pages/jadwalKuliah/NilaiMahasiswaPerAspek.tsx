import { TableMahasiswaPerAspek } from '@/components/TableComponent/TableNilaiMahasiswaPerAspek'
import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'

export default function NilaiMahasiswaPerAspek() {
  const {
    nilaiMahasiswaTransform,
    nilaiMahasiswa,
    loadingNilaiMahasiswa,
    form,
    handleSubmit,
    isNotDraft,
  } = useSiakadJadwalKuliah()

  return (
    <>
      <TableMahasiswaPerAspek
        response={nilaiMahasiswaTransform}
        loading={loadingNilaiMahasiswa}
        pageSize={1000}
        currentPage={1}
        nilaiMahasiswa={nilaiMahasiswa}
        handleSubmit={handleSubmit}
        form={form}
        isNotDraft={isNotDraft}
      />
    </>
  )
}

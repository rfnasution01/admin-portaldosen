import { ValidasiAjukan } from '@/components/DialogComponent/ValidasiAjukan'
import { TableMahasiswaPerAspek } from '@/components/TableComponent/TableNilaiMahasiswaPerAspek'
import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'
import { faFile, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NilaiMahasiswaPerAspek() {
  const {
    nilaiMahasiswaTransform,
    nilaiMahasiswa,
    loadingNilaiMahasiswa,
    isShow,
    setIsShow,
    handleSubmitAjukan,
    isLoadingAjukanNilai,
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
      <div className="flex w-full justify-end">
        <button
          onClick={() => {
            setIsShow(true)
          }}
          className="flex items-center gap-12 rounded-2xl  bg-danger px-24 py-12 text-white hover:bg-opacity-80"
        >
          <FontAwesomeIcon icon={faFile} />
          <p>Ajukan Nilai Ke Program Studi</p>
        </button>
      </div>
      <ValidasiAjukan
        isOpen={isShow}
        setIsOpen={setIsShow}
        child={
          <button
            onClick={handleSubmitAjukan}
            className="flex items-center gap-12 rounded-2xl  bg-success px-24 py-12 text-white hover:bg-opacity-80"
          >
            {isLoadingAjukanNilai ? (
              <span className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            ) : (
              <FontAwesomeIcon icon={faFile} />
            )}
            <p>Ya, Saya yakin</p>
          </button>
        }
      />
    </>
  )
}

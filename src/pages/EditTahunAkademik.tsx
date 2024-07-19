import FormUpdateTahunAkademik from '@/components/FormComponent/siakad/FormUpdateTahunAkademik'
import { useTahunAkademik } from '@/data/siakad/dashboard/useTahunAkademik'

export default function EditTahunAkademik() {
  const {
    isShow,
    isSubmit,
    setIsShow,
    setIsSubmit,
    loading,
    handleSubmit,
    form,
  } = useTahunAkademik()

  return (
    <div className="scrollbar flex h-full  w-full flex-col gap-32 overflow-y-auto p-32">
      <div className="flex flex-col gap-32 rounded-2xl border bg-white p-32 font-mono text-[2.2rem] text-neutral-black">
        <p className="font-sans text-[2.8rem] font-bold text-black-300">
          Ubah Data Aktif Tahun Akademik
        </p>
        <FormUpdateTahunAkademik
          form={form}
          handleSubmit={handleSubmit}
          isLoading={loading}
          isShow={isShow}
          isSubmit={isSubmit}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
        />
      </div>
    </div>
  )
}

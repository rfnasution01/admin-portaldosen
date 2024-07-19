/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/Form'
import { useNavigate } from 'react-router-dom'
import { SelectListData } from '@/components/SelectComponent'
import { useReferensi } from '@/data/siakad/useReferensi'
import { ValidasiUpdate } from '@/components/DialogComponent/ValidasiUpdate'
import { PreviewUpdateTA } from '@/components/Preview/siakad'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function FormUpdateTahunAkademik({
  form,
  isLoading,
  handleSubmit,
  setIsShow,
  setIsSubmit,
  isSubmit,
  isShow,
}: {
  form: UseFormReturn
  isLoading: boolean
  handleSubmit: () => Promise<void>
  setIsSubmit: Dispatch<SetStateAction<boolean>>
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  isSubmit: boolean
}) {
  const navigate = useNavigate()
  const { isFetchingProdi, isLoadingProdi, listProdiOption } = useReferensi()

  const ListTahun = []
  const tahunSekarang = new Date().getFullYear()

  for (let i = tahunSekarang; i >= tahunSekarang - 70; i--) {
    ListTahun.push({ value: i.toString(), label: String(i) })
  }

  const ListTahapan = [
    {
      value: '1',
      label: 'Tahapan 1',
    },
    {
      value: '2',
      label: 'Tahapan 2',
    },
  ]
  return (
    <div>
      <Form {...form}>
        <form
          className="flex gap-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex w-1/2 flex-col gap-32 phones:w-full">
            {/* --- Field --- */}
            <div className="flex flex-col gap-24">
              <SelectListData
                form={form}
                name="tahun"
                placeholder="Pilih Tahun"
                headerLabel="Tahun"
                isDisabled={isLoading}
                data={ListTahun}
                level1
              />

              <SelectListData
                form={form}
                name="tahap"
                placeholder="Pilih Tahapan"
                headerLabel="Tahapan"
                data={ListTahapan}
                isDisabled={isLoading}
                level2
              />

              <SelectListData
                form={form}
                name="kode_prodi"
                placeholder="Pilih Prodi"
                headerLabel="Program Studi"
                data={listProdiOption}
                isDisabled={isLoading}
                isLoading={isLoadingProdi}
                isFetching={isFetchingProdi}
                level3
              />
            </div>
            {/* --- Button Group --- */}
            <div className="flex gap-32">
              <button
                type="reset"
                onClick={async () => {
                  navigate(-1)
                }}
                className="flex items-center justify-center gap-12 rounded-2xl bg-danger px-32 py-12 text-white disabled:cursor-not-allowed"
              >
                <p>Batal</p>
              </button>
              <button
                type="submit"
                onClick={async () => {
                  const isValid = await form.trigger()

                  if (isValid) {
                    setIsShow(true)
                  }
                }}
                className="flex items-center justify-center gap-12 rounded-2xl bg-success px-32 py-12 text-white disabled:cursor-not-allowed"
              >
                <p>Simpan</p>
              </button>
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-32 phones:hidden" />
        </form>
      </Form>
      <ValidasiUpdate
        isOpen={isShow}
        setIsOpen={setIsShow}
        child={
          <div className="flex w-full flex-col gap-32 rounded-2x bg-primary-50 p-32 text-[2rem] text-black-300 phones:text-[2.4rem]">
            <PreviewUpdateTA
              tahun={form.watch('tahun')}
              tahapan={form.watch('tahap')}
              kode_prodi={form.watch('kode_prodi')}
            />
          </div>
        }
        childButton={
          <button
            type="submit"
            onClick={() => {
              setIsSubmit(true)
              handleSubmit()
            }}
            disabled={isLoading}
            className="flex items-center gap-12 rounded-2xl bg-success px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </div>
            ) : isSubmit ? (
              <FontAwesomeIcon icon={faSave} />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}
            {isSubmit ? 'Simpan' : 'Sudah Benar'}
          </button>
        }
      />
    </div>
  )
}

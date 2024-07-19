/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FormInputText } from '@/components/InputComponent'
import { Dispatch, SetStateAction, useEffect } from 'react'

export type rowType = {
  idm: string
  id_mk: string
  nim: string
  nama: string
  nilai_akhir: string
  huruf: string
  sks: string
  mutu: string
}
export default function FormJadwalKuliah({
  form,
  isLoading,
  handleSubmit,
  row,
  idAspek,
  setIDM,
}: {
  form: UseFormReturn
  setIDM: Dispatch<SetStateAction<string>>
  isLoading: boolean
  handleSubmit: () => Promise<void>
  row: rowType
  idAspek: string
}) {
  useEffect(() => {
    if (idAspek) {
      form.setValue('id_mk', row?.id_mk)
      form.setValue('id_aspek', idAspek)
    }
  }, [idAspek])

  return (
    <div>
      <Form {...form}>
        <form
          className="flex gap-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {/* --- Field --- */}
          <FormInputText
            name={`nilai_${row?.idm}`}
            form={form}
            placeholder="Nilai"
            className="text-black-200"
            type="text"
            isDisabled={isLoading}
            isFloat
            isNumber
          />
          {/* --- Button Group --- */}
          <button
            type="submit"
            onClick={() => setIDM(row?.idm)}
            className="flex items-center justify-center gap-12 rounded-2xl bg-success px-32 py-12 text-white disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </div>
            ) : (
              <FontAwesomeIcon icon={faSave} />
            )}
          </button>
        </form>
      </Form>
    </div>
  )
}

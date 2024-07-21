import { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FormInputText } from '@/components/InputComponent'
import { useEffect, useState } from 'react'

export type rowType = {
  idm: string
  id_mk: string
  nim: string
  nama: string
  nilai_akhir: string
  huruf: string
  sks: string
  mutu: string
  [key: string]: string | null
}

export default function FormJadwalKuliah({
  form,
  isLoading,
  handleSubmit,
  row,
  setLoading,
  isNotDraft,
  editID,
  keyString,
}: {
  form: UseFormReturn
  isNotDraft: boolean
  isLoading: boolean
  handleSubmit: (idm: string) => Promise<void>
  row: rowType
  setLoading: (idm: string, isLoading: boolean) => void
  editID: string
  keyString: string
  isSuccessEditNilai: boolean
}) {
  const onSubmit = async () => {
    setLoading(row.idm, true)
    await handleSubmit(row?.idm)
    setLoading(row.idm, false)
  }

  // useEffect(() => {
  //   if (keyString && editID && row) {
  //     const currentFormValue = form.getValues(`nilai_${row?.idm}`)
  //     if (row[keyString] !== currentFormValue) {
  //       form.setValue(`nilai_${row?.idm}_${editID}`, row[keyString] || '')
  //     }
  //   }
  // }, [keyString, editID, row, form])

  const [prevEditID, setPrevEditID] = useState(editID)

  // console.log(formWatch)

  // useEffect(() => {
  //   if (keyString && editID && row) {
  //     const currentFormValue = form.getValues(`nilai_${row?.idm}_${editID}`)
  //     const newValue = row[keyString]

  //     // Only set value if newValue is valid and different from the current form value
  //     if (
  //       newValue !== null &&
  //       newValue !== undefined &&
  //       newValue !== '' &&
  //       currentFormValue !== newValue
  //     ) {
  //       form.setValue(`nilai_${row?.idm}_${editID}`, newValue)
  //     } else if (
  //       newValue === null ||
  //       newValue === undefined ||
  //       newValue === ''
  //     ) {
  //       form.setValue(`nilai_${row?.idm}_${editID}`, '')
  //     }
  //   }
  // }, [keyString, editID, row, form])

  useEffect(() => {
    if (editID !== prevEditID) {
      // Reset form values when editID changes
      form.reset()
      setPrevEditID(editID)
    } else if (keyString && editID && row) {
      const fieldName = `nilai_${row?.idm}_${editID}`
      const currentFormValue = form.getValues(fieldName)
      const newValue = row[keyString]

      if (
        newValue !== null &&
        newValue !== undefined &&
        newValue !== '' &&
        currentFormValue !== newValue
      ) {
        form.setValue(fieldName, newValue)
      } else if (
        (newValue === null || newValue === undefined || newValue === '') &&
        (currentFormValue === undefined || currentFormValue === '')
      ) {
        form.setValue(fieldName, '')
      }
    }
  }, [keyString, editID, row, form, prevEditID])

  return (
    <div>
      <Form {...form}>
        <form className="flex gap-32" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInputText
            name={`nilai_${row?.idm}_${editID}`}
            form={form}
            placeholder="Nilai"
            className="text-black-200"
            type="text"
            isDisabled={isLoading || isNotDraft}
            isFloat
          />
          <button
            type="submit"
            disabled={isNotDraft}
            className="flex items-center justify-center gap-12 rounded-2xl bg-success px-16 py-12 text-white disabled:cursor-not-allowed"
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

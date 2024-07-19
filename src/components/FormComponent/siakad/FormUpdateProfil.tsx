/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faSave,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FormInputText } from '@/components/InputComponent'
import { Dispatch, SetStateAction } from 'react'

export default function FormUpdateProfil({
  form,
  isLoading,
  handleSubmit,
  setIsShow,
}: {
  form: UseFormReturn
  isLoading: boolean
  handleSubmit: () => Promise<void>
  setIsShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div>
      <Form {...form}>
        <form
          className="flex w-[50rem] flex-col gap-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {/* --- Field --- */}
          <div className="flex flex-col gap-24">
            <FormInputText
              name="nama"
              form={form}
              placeholder="Nama"
              className="text-black-200"
              type="text"
              isDisabled={isLoading}
            />
            <FormInputText
              name="gelar_depan"
              form={form}
              placeholder="Gelar Depan"
              className="text-black-200"
              type="text"
              isDisabled={isLoading}
            />
            <FormInputText
              name="gelar_belakang"
              form={form}
              placeholder="Gelar Belakang"
              className="text-black-200"
              type="text"
              isDisabled={isLoading}
            />
            <FormInputText
              name="hp"
              form={form}
              placeholder="HP"
              className="text-black-200"
              type="text"
              isDisabled={isLoading}
            />
            <FormInputText
              name="nidn"
              form={form}
              placeholder="NIDN"
              className="text-black-200"
              type="text"
              isDisabled={isLoading}
            />
            <FormInputText
              name="email"
              form={form}
              placeholder="email"
              className="text-black-200"
              type="text"
              isDisabled={isLoading}
            />
          </div>
          {/* --- Button Group --- */}
          <div className="flex justify-center gap-32">
            <button
              type="reset"
              onClick={async () => {
                setIsShow(false)
              }}
              className="flex items-center justify-center gap-12 rounded-2xl bg-danger px-32 py-12 text-white disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <p>Batal</p>
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-12 rounded-2xl bg-success px-32 py-12 text-white disabled:cursor-not-allowed"
            >
              <p>Simpan</p>
              {isLoading ? (
                <div className="animate-spin duration-300">
                  <FontAwesomeIcon icon={faSpinner} />
                </div>
              ) : (
                <FontAwesomeIcon icon={faSave} />
              )}
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

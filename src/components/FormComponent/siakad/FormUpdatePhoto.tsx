import { Form } from '@/components/Form'
import { FormInputFile } from '@/components/InputComponent'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'

export function FormUpdatePhoto({
  urls,
  setUrls,
  loadingFile,
  handleUploadFoto,
  formPhoto,
}: {
  urls: string
  setUrls: Dispatch<SetStateAction<string>>
  formPhoto: UseFormReturn
  loadingFile: boolean
  handleUploadFoto: (file: File) => Promise<void>
}) {
  return (
    <Form {...formPhoto}>
      <form className="flex flex-col gap-32">
        <FormInputFile
          urls={urls}
          setUrls={setUrls}
          form={formPhoto}
          loadingFile={loadingFile}
          name="photo"
          handleUploadFoto={handleUploadFoto}
          label="Photo"
        />
      </form>
    </Form>
  )
}

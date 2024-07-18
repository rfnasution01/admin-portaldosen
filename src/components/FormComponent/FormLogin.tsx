import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
} from '@fortawesome/free-solid-svg-icons'
import { PostLoginParams } from '@/store/type/loginType'
import { Form } from '../Form'
import { FormInputText } from '../InputComponent'

export function FormLogin({
  form,
  isLoading,
  handleSubmit,
  angka1,
  angka2,
}: {
  form: UseFormReturn
  isLoading: boolean
  handleSubmit: (values: PostLoginParams) => Promise<void>
  angka1: number
  angka2: number
}) {
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-32"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-16">
          <FormInputText
            name="username"
            form={form}
            placeholder="Email"
            className="text-black-200"
            type="text"
            isDisabled={isLoading}
            prefix={<FontAwesomeIcon icon={faEnvelope} />}
          />

          <FormInputText
            name="password"
            form={form}
            placeholder="Password"
            className="text-black-200"
            isDisabled={isLoading}
            suffix={
              <span
                onClick={() => {
                  setIsShow(!isShow)
                }}
              >
                {isShow ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
            }
            prefix={<FontAwesomeIcon icon={faKey} />}
            type={isShow ? 'text' : 'password'}
          />

          <FormInputText
            name="hasil"
            form={form}
            placeholder={`Hasil dari ${angka1} + ${angka2} = ?`}
            className="text-black-200"
            type="text"
            isNumber
            isDisabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="bg-primary-900 flex items-center justify-center gap-12 rounded-2xl py-12 text-white"
        >
          <p>Login</p>
        </button>
      </form>
    </Form>
  )
}

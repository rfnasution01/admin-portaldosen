/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { Input } from '.'
import { Dispatch, SetStateAction } from 'react'
import { Bounce, toast } from 'react-toastify'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'

export function FormInputFile({
  form,
  setUrls,
  urls,
  isLoading,
  loadingFile,
  handleUploadFoto,
  label,
  name,
  isDisabled,
  ratio,
}: {
  form: UseFormReturn | undefined | any
  setUrls: Dispatch<SetStateAction<string>>
  urls: string
  isLoading: boolean
  loadingFile: boolean
  name: string
  label?: string
  handleUploadFoto: (file: File) => Promise<void>
  isDisabled?: boolean
  ratio?: '3x4'
}) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-12">
          <FormControl>
            <div>
              <Input
                className="-z-[1] h-[0.1px] w-[0.1px] overflow-hidden opacity-0"
                {...field}
                id="berkas"
                type="file"
                value={''}
                disabled={isLoading || loadingFile || isDisabled}
                placeholder="Lampiran"
                onChange={(e) => {
                  if (e.target.files[0].size > 5 * 1000000) {
                    return toast.error(`File terlalu besar. Maksimal 5 MB`, {
                      position: 'bottom-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'light',
                      transition: Bounce,
                    })
                  } else {
                    if (e.target.files[0] != null) {
                      handleUploadFoto(e.target.files[0])
                    }
                  }
                }}
              />
              <div className="flex flex-col gap-32 phones:flex-col">
                <label
                  className="flex flex-col gap-12 font-roboto"
                  htmlFor="berkas"
                >
                  {label ?? 'Berkas'}
                  <div className="flex">
                    <div
                      className={clsx(
                        'flex items-center gap-12 rounded-2xl p-12 hover:cursor-pointer hover:bg-opacity-80',
                        {
                          'bg-warna-dark text-white': urls,
                          'border border-warna-dark text-warna-dark': !urls,
                        },
                      )}
                    >
                      {loadingFile ? (
                        <span className="animate-spin duration-300">
                          <FontAwesomeIcon icon={faSpinner} />
                        </span>
                      ) : (
                        <FontAwesomeIcon icon={faImage} />
                      )}
                      <p className="text-[1.6rem] uppercase tracking-1.25">
                        {urls === undefined || urls === '' || urls === null
                          ? 'Unggah'
                          : 'Ganti'}
                      </p>
                    </div>
                  </div>
                </label>

                <div className="flex w-full flex-wrap items-start gap-32 whitespace-nowrap text-warna-dark phones:w-full">
                  {urls ? (
                    <div className="relative flex w-1/4 flex-col items-center gap-4 phones:w-1/2">
                      <div className="relative w-full">
                        <img
                          src={urls}
                          alt="Gambar"
                          className={clsx('rounded-2x object-cover filter', {
                            'w-full': ratio === '3x4',
                          })}
                          loading="lazy"
                        />
                        <button
                          disabled={isLoading || isDisabled || loadingFile}
                          onClick={(e) => {
                            e.stopPropagation()
                            setUrls(null)
                          }}
                          className="bg-danger-700 hover:bg-danger absolute right-8 top-8 rounded-lg p-4 text-white hover:cursor-pointer disabled:cursor-not-allowed"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>Belum ada file di upload</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

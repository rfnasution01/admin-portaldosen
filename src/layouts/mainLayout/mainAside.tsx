import SkeletonCard from '@/components/SkeletonComonent/SkeletonCard'
import { useSiakadProfil } from '@/data/siakad/useProfil'
import { getInitials } from '@/utils/formatText'
import { MainMenu } from './mainMenu'
import { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'
import { UpdatePhotoProfil } from '@/components/DialogComponent/UpdatePhotoProfil'
import { Form } from '@/components/Form'
import { FormInputFile } from '@/components/InputComponent'

interface EditButtonProps {
  onClick: () => void
}

export function MainAside({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const {
    loadingProfil,
    profil,
    form,
    loadingFile,
    handleUploadFoto,
    urls,
    setUrls,
    setIsShow,
    isShow,
  } = useSiakadProfil()

  return (
    <div
      className={clsx('flex w-full flex-col gap-32', {
        'phones:h-auto': !isOpen,
        'h-full': isOpen,
      })}
    >
      {/* --- Profil --- */}
      <div className="flex w-full flex-col items-center justify-center gap-16">
        {loadingProfil ? (
          <SkeletonCard />
        ) : (
          <>
            <div className="relative">
              {profil?.identitas?.gambar ? (
                <>
                  <img
                    src={profil?.identitas?.gambar}
                    className="h-[16rem] w-[14rem] rounded-2xl object-cover"
                    loading="lazy"
                    alt={profil?.identitas?.nama}
                  />
                  <EditButton
                    onClick={() => {
                      setIsShow(true)
                    }}
                  />
                </>
              ) : (
                <div className="relative flex h-[16rem] w-[14rem] items-center justify-center rounded-2xl bg-background-secondary text-black-200">
                  <p className="text-[3.2rem]">
                    {getInitials(profil?.identitas?.nama)}
                  </p>
                  <EditButton
                    onClick={() => {
                      setIsShow(true)
                    }}
                  />
                </div>
              )}
            </div>

            <p className="font-sans text-[2.6rem]">
              @{profil?.identitas?.username}
            </p>
            <p>{profil?.identitas?.nidn}</p>
          </>
        )}
      </div>
      {/* --- Menu --- */}
      <MainMenu setIsOpen={setIsOpen} />
      <UpdatePhotoProfil
        isOpen={isShow}
        setIsOpen={setIsShow}
        child={
          <div className="flex gap-32">
            <Form {...form}>
              <form className="flex flex-col gap-32">
                <FormInputFile
                  urls={urls}
                  setUrls={setUrls}
                  form={form}
                  loadingFile={loadingFile}
                  name="photo"
                  handleUploadFoto={handleUploadFoto}
                  label="Photo"
                />
              </form>
            </Form>
          </div>
        }
      />
    </div>
  )
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-8 top-8 rounded-2xl bg-secondary-shade-100 px-4 py-8 text-white hover:bg-opacity-80"
    aria-label="Edit"
  >
    ✏️
  </button>
)

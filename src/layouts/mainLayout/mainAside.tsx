import SkeletonCard from '@/components/SkeletonComonent/SkeletonCard'
import { useSiakadProfil } from '@/data/siakad/useProfil'
import { getInitials } from '@/utils/formatText'
import { MainMenu } from './mainMenu'
import { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'
import { FormUpdatePhoto } from '@/components/FormComponent/siakad'
import FormUpdateProfil from '@/components/FormComponent/siakad/FormUpdateProfil'
import { ValidasiUpdateForm } from '@/components/DialogComponent/ValidasiUpdateForm'

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
    formPhoto,
    loadingFile,
    handleUploadFoto,
    urls,
    setUrls,
    setIsShowPhoto,
    isShowPhoto,
    isShowProfil,
    setIsShowProfil,
    isLoadingEditProfil,
    handleSubmit,
    formUpdateProfil,
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
                      setIsShowPhoto(true)
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
                      setIsShowPhoto(true)
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-12">
              <p className="font-sans text-[2.6rem]">
                @{profil?.identitas?.username}
              </p>
              <button
                onClick={() => setIsShowProfil(true)}
                className="rounded-2xl px-4 py-8 hover:bg-opacity-80"
                aria-label="Edit"
              >
                ✏️
              </button>
            </div>
            <p>{profil?.identitas?.nidn}</p>
          </>
        )}
      </div>
      {/* --- Menu --- */}
      <MainMenu setIsOpen={setIsOpen} />

      <ValidasiUpdateForm
        isOpen={isShowProfil}
        setIsOpen={setIsShowProfil}
        title="Form Ganti Photo"
        isShow
        child={
          <div className="flex gap-32">
            <FormUpdateProfil
              form={formUpdateProfil}
              handleSubmit={handleSubmit}
              isLoading={isLoadingEditProfil}
              setIsShow={setIsShowProfil}
            />
          </div>
        }
      />

      <ValidasiUpdateForm
        isOpen={isShowPhoto}
        setIsOpen={setIsShowPhoto}
        title="Form Update Profil"
        child={
          <div className="flex gap-32">
            <FormUpdatePhoto
              urls={urls}
              setUrls={setUrls}
              formPhoto={formPhoto}
              handleUploadFoto={handleUploadFoto}
              loadingFile={loadingFile}
            />
          </div>
        }
      />
    </div>
  )
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-8 top-8 rounded-2xl text-[2.8rem] hover:bg-opacity-80"
    aria-label="Edit"
  >
    🎦
  </button>
)

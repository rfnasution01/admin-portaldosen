import SkeletonCard from '@/components/SkeletonComonent/SkeletonCard'
import { useSiakadProfil } from '@/data/siakad/useProfil'
import { getInitials } from '@/utils/formatText'
import { MainMenu } from './mainMenu'
import { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'

export function MainAside({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { loadingProfil, profil } = useSiakadProfil()

  return (
    <div
      className={clsx('flex w-full flex-col gap-32', {
        'phones:h-auto': !isOpen,
        'h-full': isOpen,
      })}
    >
      {/* --- Profil --- */}
      <div className="flex w-full flex-col justify-center gap-16">
        {loadingProfil ? (
          <SkeletonCard />
        ) : (
          <>
            {profil?.identitas?.gambar || profil?.identitas?.gambar !== '' ? (
              <img
                src={profil?.identitas?.gambar}
                className="h-[16rem] w-[14rem]"
                loading="lazy"
                alt={profil?.identitas?.nama}
              />
            ) : (
              <div className="text-black-200 flex h-[16rem] w-[14rem] items-center justify-center rounded-2xl bg-background-secondary">
                <p className="text-[3.2rem]">
                  {getInitials(profil?.identitas?.nama)}
                </p>
              </div>
            )}

            <p className="font-sans text-[2.6rem]">
              @{profil?.identitas?.username}
            </p>
            <p>{profil?.identitas?.nidn}</p>
          </>
        )}
      </div>
      {/* --- Menu --- */}
      <MainMenu setIsOpen={setIsOpen} />
    </div>
  )
}

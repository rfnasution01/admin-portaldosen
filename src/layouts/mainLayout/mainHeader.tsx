import { IconDashboard } from '@/assets/icon'
import SkeletonText from '@/components/SkeletonComonent/SkeletonText'
import { useSiakadProfil } from '@/data/siakad/useProfil'
import { faAlignJustify, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { Dispatch, SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MainMenu } from './mainMenu'

export function MainHeader({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}) {
  const navigate = useNavigate()
  const { loadingProfil, profil } = useSiakadProfil()

  return (
    <div
      className={clsx('scrollbar flex flex-col gap-32 overflow-y-auto ', {
        'phones:h-auto': !isOpen,
        'h-full bg-primary-900': isOpen,
      })}
    >
      <div className="flex items-center justify-between gap-32 bg-primary-900 px-64 py-12 text-neutral-white phones:px-32">
        <div className="flex items-center gap-12">
          <img src="/logo.png" className="w-[6rem]" loading="lazy" alt="Logo" />
          <p className="font-sans text-[2.4rem] font-bold phones:hidden">
            Portal Akademik Dosen
          </p>
        </div>
        {loadingProfil ? (
          <SkeletonText lines={1} className="w-1/3" />
        ) : (
          profil && (
            <div className="flex items-center gap-12 phones:gap-32">
              <p className="phones:hidden"> {profil?.identitas?.nama}</p>
              <p className="phones:hidden">|</p>
              <p className="phones:hidden">
                {profil?.akademik?.nama_tahun} / {profil?.akademik?.tahap}
              </p>
              <p className="phones:hidden">|</p>
              <p className="phones:hidden">{profil?.akademik?.nama_prodi}</p>
              <p className="phones:hidden">|</p>
              <Link to={'edit-ta'}>
                <span className="hover:cursor-pointer hover:text-white">
                  <IconDashboard size={12} />
                </span>
              </Link>
              <p>|</p>
              <p>
                <span
                  className="text-danger hover:cursor-pointer hover:text-red-300"
                  onClick={() => {
                    Cookies.remove('token')
                    navigate('/login')
                  }}
                >
                  Logout
                </span>
              </p>
              <span
                onClick={() => setIsOpen(!isOpen)}
                className="hidden phones:block"
              >
                {isOpen ? (
                  <FontAwesomeIcon icon={faClose} size="sm" />
                ) : (
                  <FontAwesomeIcon icon={faAlignJustify} size="sm" />
                )}
              </span>
            </div>
          )
        )}
      </div>
      <div
        className={clsx('scrollbar hidden h-full overflow-y-auto px-32', {
          'phones:block': isOpen,
        })}
      >
        <MainMenu setIsOpen={setIsOpen} />
      </div>
    </div>
  )
}

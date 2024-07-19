import { ListMenu } from '@/data/listMenu'
import { convertToSlug } from '@/utils/formatText'
import { usePathname } from '@/utils/usePathname'
import {
  faArrowLeft,
  faBorderAll,
  faKey,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom'
import { LinkParent } from './LinkParent'
import { LinkChild } from './LinkChild'
import { ValidasiLogout } from '@/components/DialogComponent/ValidasiLogout'
import { useLogout } from '@/data/useLogout'

export function MainMenu({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { isShowLogout, setIsShowLogout, handleLogout } = useLogout()
  const { firstPathname } = usePathname()

  const [isShow, setIsShow] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const isActivePage = (item: string) => {
    if (
      (item.toLowerCase() === 'dashboard' && firstPathname === '') ||
      (item.toLocaleLowerCase() === 'dashboard' &&
        firstPathname === 'edit-ta') ||
      convertToSlug(item) === firstPathname
    ) {
      return true
    }
    return false
  }

  return (
    <div className="flex flex-col gap-8">
      {/* --- Dashboard --- */}
      <Link
        to={'/'}
        className={clsx(
          'flex items-center gap-12 rounded-lg p-12 hover:bg-primary-active hover:text-white',
          {
            'bg-primary-active text-white': isActivePage('dashboard'),
            'text-primary-inactive': !isActivePage('dashboard'),
          },
        )}
      >
        <FontAwesomeIcon icon={faBorderAll} />
        <p className="text-[2.2rem]">Dashboard</p>
      </Link>
      <hr className="border border-[#fafafa] opacity-50" />
      <div className="flex flex-col gap-8">
        {ListMenu?.map((item, idx) => (
          <div className="flex flex-col gap-24" key={idx}>
            <LinkParent
              item={item}
              setActiveIndex={setActiveIndex}
              setIsOpen={setIsOpen}
              setIsShow={setIsShow}
              activeIndex={activeIndex}
              idx={idx}
              isActivePage={isActivePage}
              isShow={isShow}
            />
            {item?.children?.length > 0 && activeIndex === idx && (
              <div className="flex flex-col gap-8">
                <LinkChild
                  item={item}
                  setIsOpen={setIsOpen}
                  isActivePage={isActivePage}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <hr className="border border-[#fafafa] opacity-50" />
      <div className="flex flex-col gap-8">
        <Link
          to={'/ubah-password'}
          className={clsx(
            'flex items-center gap-12 rounded-lg p-12 hover:bg-primary-active hover:text-white',
            {
              'bg-primary-active': isActivePage('ubah-password'),
              'text-primary-inactive': !isActivePage('ubah-password'),
            },
          )}
        >
          <FontAwesomeIcon icon={faKey} />
          <p className="text-[2.2rem]">Ubah Password</p>
        </Link>
        <button
          className={clsx(
            'flex items-center gap-12 rounded-lg p-12 hover:bg-primary-active hover:text-white',
            {
              'bg-primary-active': isActivePage('logout'),
              'text-primary-inactive': !isActivePage('logout'),
            },
          )}
          onClick={() => setIsShowLogout(true)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <p className="text-[2.2rem]">Logout</p>
        </button>
      </div>
      <ValidasiLogout
        isOpen={isShowLogout}
        setIsOpen={setIsShowLogout}
        child={
          <button
            onClick={handleLogout}
            className="flex w-[10rem] items-center justify-center gap-12 rounded-2xl bg-success px-24 py-12 text-center text-white hover:bg-opacity-80"
          >
            <p>Ya</p>
          </button>
        }
      />
    </div>
  )
}

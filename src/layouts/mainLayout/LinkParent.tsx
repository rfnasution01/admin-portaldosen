import { ListMenuType } from '@/data/listMenu'
import { convertToSlug } from '@/utils/formatText'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

export function LinkParent({
  item,
  setIsShow,
  setIsOpen,
  isShow,
  setActiveIndex,
  idx,
  activeIndex,
  isActivePage,
}: {
  item: ListMenuType
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setIsShow: Dispatch<SetStateAction<boolean>>
  setActiveIndex: Dispatch<SetStateAction<number>>
  isShow: boolean
  idx: number
  activeIndex: number
  isActivePage: (item: string) => boolean
}) {
  return (
    <Link
      to={item?.children?.length > 0 ? '' : convertToSlug(item?.nama)}
      onClick={(e) => {
        if (item?.children?.length > 0) {
          e.preventDefault()
          e.stopPropagation()
          setIsShow(!isShow)
        } else {
          setIsOpen(false)
        }
        setActiveIndex(activeIndex === idx ? null : idx)
      }}
      className={clsx(
        'flex items-center justify-between gap-12 rounded-lg p-12 hover:bg-primary-active hover:text-white',
        {
          'bg-primary-active': isActivePage(item?.nama),
          'text-primary-inactive': !isActivePage(item?.nama),
        },
      )}
    >
      <div className="flex items-center gap-12 text-[2.2rem]">
        {item?.icon}
        <p>{item?.nama}</p>
      </div>
      {item?.children?.length > 0 && (
        <span>
          {isShow && idx === activeIndex ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} />
          )}
        </span>
      )}
    </Link>
  )
}

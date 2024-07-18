import { ListMenuType } from '@/data/listMenu'
import { convertToSlug } from '@/utils/formatText'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

export function LinkChild({
  item,
  setIsOpen,
  isActivePage,
}: {
  item: ListMenuType
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isActivePage: (item: string) => boolean
}) {
  return (
    <>
      {item?.children?.map((list, idx) => (
        <Link
          to={`/${convertToSlug(item?.nama)}/${convertToSlug(list)}`}
          onClick={() => {
            setIsOpen(false)
          }}
          className={clsx(
            'flex items-center justify-between gap-12 rounded-lg hover:text-white',
            {
              'text-white': isActivePage(list),
              'text-primary-inactive': !isActivePage(list),
            },
          )}
          key={idx}
        >
          <div className="flex items-center gap-12 px-32 py-8 text-[2.2rem]">
            <p>{list}</p>
          </div>
        </Link>
      ))}
    </>
  )
}

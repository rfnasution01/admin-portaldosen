import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '.'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ValidasiUpdateForm({
  isOpen,
  setIsOpen,
  child,
  title,
  isShow,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  child: ReactNode
  title?: string
  isShow?: boolean
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-[2rem] text-black"
        position="middle"
      >
        <div className="flex flex-col gap-32 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="text-center text-[2.4rem] font-bold phones:text-[2.8rem]">
                {title}
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <FontAwesomeIcon icon={faX} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          {child}
          {!isShow && (
            <div className="flex items-center justify-center gap-32 text-[2rem]">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex w-[10rem] items-center justify-center gap-12 rounded-2xl border bg-danger px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

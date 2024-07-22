import { useState } from 'react'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './Menubar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { useSiakadJadwalKuliah } from '@/data/siakad/dashboard'
import { useSiakadProfil } from '@/data/siakad/useProfil'
import { PrintBAUAS, PrintHasil, PrintKehadiran } from '../PrintComponent'

export function MenubarPrint() {
  const { nilaiMahasiswa, jadwalKuliahDetail, bobot } = useSiakadJadwalKuliah()
  const { identitas, profil } = useSiakadProfil()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Menubar className="px-4">
      <MenubarMenu>
        <MenubarTrigger
          className="w-full text-center transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={handleMenuClick}
        >
          <div className="flex items-center gap-12">
            <span className={`rounded-2xl`}>
              <FontAwesomeIcon icon={faPrint} size="xl" />
            </span>
            <p>Cetak</p>
          </div>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="absolute -right-[10rem] top-0 w-[30rem] bg-white p-32 text-[2rem] text-primary-900 shadow-lg transition-all duration-300">
            <div className="flex flex-col gap-12">
              <PrintHasil
                response={nilaiMahasiswa}
                jadwalKuliahDetail={jadwalKuliahDetail}
                identitas={identitas}
                profil={profil}
              />

              <PrintKehadiran
                response={nilaiMahasiswa}
                jadwalKuliahDetail={jadwalKuliahDetail}
                identitas={identitas}
                profil={profil}
              />

              <PrintBAUAS
                response={nilaiMahasiswa}
                jadwalKuliahDetail={jadwalKuliahDetail}
                identitas={identitas}
                profil={profil}
                bobot={bobot}
              />
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}

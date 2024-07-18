import { IconDashboard } from '@/assets/icon'
import SkeletonText from '@/components/SkeletonComonent/SkeletonText'
import { useSiakadProfil } from '@/data/siakad/useProfil'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export function MainHeader() {
  const navigate = useNavigate()
  const { loadingProfil, profil } = useSiakadProfil()

  return (
    <div className="bg-primary-900 text-neutral-white flex items-center justify-between gap-32 px-64 py-12 phones:px-32">
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
          <div className="flex items-center gap-12">
            <p className="phones:hidden"> {profil?.identitas?.nama}</p>
            <p className="phones:hidden">|</p>
            <p className="phones:hidden">
              {profil?.akademik?.nama_tahun} / {profil?.akademik?.semester}
            </p>
            <p className="phones:hidden">|</p>
            <p>
              <span className="hover:cursor-pointer hover:text-white">
                <IconDashboard size={12} />
              </span>
            </p>
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
          </div>
        )
      )}
    </div>
  )
}

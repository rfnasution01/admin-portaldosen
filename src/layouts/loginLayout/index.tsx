import { FormLogin } from '@/components/FormComponent'
import { useLogin } from '@/data/useLogin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function LoginLayout() {
  const { form, angka1, angka2, loadingLogin, handleSubmit } = useLogin()

  return (
    <div className="scrollbar flex h-screen items-center justify-center overflow-y-auto">
      <div className="flex w-3/12 flex-col gap-32 rounded-3x bg-white p-48 shadow-lg phones:w-5/6">
        <div className="flex flex-col items-center justify-center gap-12">
          <img
            src="/logo.png"
            className="w-[12rem]"
            alt="Logo"
            loading="lazy"
          />
          <p className="font-sans text-[3rem] text-black-100">
            Portal Akademik Dosen
          </p>
        </div>
        <FormLogin
          form={form}
          isLoading={loadingLogin}
          handleSubmit={handleSubmit}
          angka1={angka1}
          angka2={angka2}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

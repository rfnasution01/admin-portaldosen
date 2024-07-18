import { LoginSchema } from '@/store/schema/loginSchema'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { usePostLoginMutation } from '@/store/slices/loginAPI'
import { PostLoginParams } from '@/store/type/loginType'
import { Bounce, toast } from 'react-toastify'

export function useLogin() {
  const navigate = useNavigate()

  const [angka1, setAngka1] = useState<number>(null)
  const [angka2, setAngka2] = useState<number>(null)

  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  })

  // Fungsi untuk menghasilkan dua angka acak antara 1 dan 10
  const generateRandomNumbers = () => {
    const random1 = Math.floor(Math.random() * 10) + 1 // Menghasilkan angka acak antara 1 dan 10
    const random2 = Math.floor(Math.random() * 10) + 1
    setAngka1(random1)
    setAngka2(random2)
  }

  useEffect(() => {
    generateRandomNumbers()
  }, [])

  // --- Create Login ---
  const [
    createLogin,
    {
      isError: isErrorLogin,
      error: errorLogin,
      isLoading: isLoadingLogin,
      isSuccess: isSuccessLogin,
    },
  ] = usePostLoginMutation()

  const handleSubmit = async (values: PostLoginParams) => {
    const body = {
      username: values?.username,
      password: values?.password,
      hasil: values?.hasil,
    }

    if (Number(values?.hasil) === angka1 + angka2) {
      try {
        const res = await createLogin({ data: body })
        if ('data' in res) {
          const token = res?.data?.data?.token
          Cookies.set('token', token)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      toast.error(`Jawaban salah!`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }

  useEffect(() => {
    if (isSuccessLogin) {
      toast.success('Login berhasil', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setTimeout(() => {
        navigate(`/`)
      }, 3000)
    }
  }, [isSuccessLogin])

  useEffect(() => {
    if (isErrorLogin) {
      const errorMsg = errorLogin as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorLogin, errorLogin])

  return {
    form,
    angka1,
    angka2,
    setAngka1,
    setAngka2,
    handleSubmit,
    loadingLogin: isLoadingLogin,
  }
}

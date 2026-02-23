import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
// TODO: uncomment when backend is ready
// import authService from '@/api/auth'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginForm = z.infer<typeof loginSchema>

// TODO: remove dummy login when backend is integrated
const DUMMY_USER = {
  id: 1,
  email: 'admin@inqwork.com',
  displayName: 'Admin User',
  role: 'ADMIN' as const,
  emailVerified: true,
  avatarUrl: null,
  bio: null,
}

export default function LoginPage() {
  const { setAccessToken, setUser } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@inqwork.com',
      password: 'admin123',
    },
  })

  const onSubmit = async (_data: LoginForm) => {
    setIsSubmitting(true)
    try {
      // TODO: replace with real API call when backend is ready
      // const res = await authService.login(data)
      // const { accessToken, user } = res.data
      // if (user.role !== 'ADMIN') {
      //   toast.error('You do not have admin access.')
      //   return
      // }
      // setAccessToken(accessToken)
      // setUser(user)

      // Dummy login — remove this block when integrating API
      await new Promise((r) => setTimeout(r, 500))
      setAccessToken('dummy-admin-token')
      setUser(DUMMY_USER)
      toast.success('Logged in successfully')
      navigate('/', { replace: true })
    } catch {
      toast.error('Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <img src="/logo-icon.png" alt="InqWork" className="mx-auto mb-4 h-12 w-12 object-contain" />
        <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
        <p className="mt-1 text-sm text-gray-500">Sign in to InqWork Admin Dashboard</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="admin@inqwork.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" fullWidth loading={isSubmitting}>
          Sign In
        </Button>
      </form>
    </div>
  )
}

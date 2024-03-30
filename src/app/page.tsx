'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
export default function Home() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const router = useRouter()
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null)
    setStatus('Signing in...')
    const logger = await signIn('credentials', {
      email: user.email,
      password: user.password,
      redirect: false
    })
    if (logger?.ok) {
      router.push("/dashboard")
      return
    }
    setStatus(null)
    setError("Invalid email or password. Please try again.");
    setInterval(() => {
      setError(null)
    }, 10000)
  }
  return (
    <>
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            role="alert"
            className="fixed bg-opacity-75 top-0 flex items-center justify-center py-4 w-full">
            <div className="bg-white border-l-4 border-r-4 border-purple-400 text-gray-600 px-4 py-3 rounded-lg shadow-lg" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Image className="mx-auto h-[100px] w-auto" src={'/asserts/logo/logo.svg'} height={100} width={100} alt="Logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-600 tracking-tight sm:text-4xl">
              Sign in to your Shopify account
            </h2>
          </div>
          <form onSubmit={handleSignIn} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <input
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-4 flex items-center"
                  >
                    <FiEye
                      className={`${showPassword ? "text-gray-400 hidden" : "text-gray-600"} h-6 w-6 cursor-pointer`}
                    />
                    <FiEyeOff
                      className={`${!showPassword ? "text-gray-400 hidden" : "text-gray-600"} h-6 w-6 cursor-pointer`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-800">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-inset"
            >
              {
                status ? status : 'Sign in'
              }
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

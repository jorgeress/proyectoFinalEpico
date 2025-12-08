'use client'

import { useRouter } from 'next/navigation'

export default function Header({ user }) {
  const router = useRouter()

  const logout = () => {
    localStorage.clear()
    router.push("/")
  }

  return (
    <header className="flex justify-between items-center mb-6">
      <h2 className="text-xl">Hola, {user.display_name}</h2>

      <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
        Logout
      </button>
    </header>
  )
}

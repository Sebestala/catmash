'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  const handleRetry = () => {
    // Tente de réinitialiser l'erreur
    reset()
    // Force un rafraîchissement de la page actuelle
    router.refresh()
    // Si l'erreur persiste, recharge complètement la page après un court délai
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  const handleHomeClick = () => {
    router.refresh()
    router.push('/')
    setTimeout(() => {
      window.location.href = '/'
    }, 100)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600">Une erreur est survenue</h1>
        <p className="mt-4 text-lg text-red-500">{error.message}</p>
        <button
          onClick={handleRetry}
          className="mt-6 w-40 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition duration-300 ease-in-out"
        >
          Réessayer
        </button>
        <button
          onClick={handleHomeClick}
          className="mt-6 w-40 ml-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  )
}

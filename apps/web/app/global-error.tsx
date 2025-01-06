'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex h-screen items-center justify-center bg-red-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Une erreur est survenue</h1>
            <p className="mt-4 text-lg text-red-500">{error.message}</p>
            <button
              onClick={() => reset()}
              className="mt-6 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Réessayer
            </button>
            <button
              onClick={() => router.push('/')}
              className="mt-6 ml-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

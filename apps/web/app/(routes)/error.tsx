'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Error component displays an error message with options to retry or return to the homepage.
 *
 * @param {Error} error - The error object containing details about the error.
 * @param {() => void} reset - A function to reset the error boundary state.
 * @returns {React.ReactElement} The rendered error UI.
 *
 * Features:
 * - Logs the error details to the console when the component mounts.
 * - Provides a "Retry" button to reset the error boundary, refresh the page, and reload the window.
 * - Provides a "Home" button to navigate back to the homepage and reload the page.
 * - Displays the error name, message, and cause (if available) in a user-friendly format.
 */
export default function Error({ error, reset }: { error: Error; reset: () => void }): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    error && console.error(error)
  }, [error])

  const handleRetry = () => {
    reset()
    router.refresh()
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
      <div className="flex flex-col text-center bg-white p-8 rounded-lg shadow-md justify-center items-center gap-2">
        <h1 className="text-2xl font-bold text-red-600">Une erreur est survenue</h1>
        <p className="text-lg text-red-500">
          {error.name} / {error.message}
          {error.cause ? <p className="text-lg text-blue-500">/{String(error.cause)}</p> : null}
        </p>

        <div className="flex flex-col md:flex-row md:gap-4 gap-2">
          <button
            onClick={handleRetry}
            className="w-40 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Réessayer
          </button>
          <button
            onClick={handleHomeClick}
            className="w-40 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  )
}

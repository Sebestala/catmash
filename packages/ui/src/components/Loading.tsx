/**
 * Loading component displays a spinner to indicate a loading state.
 *
 * @returns {React.ReactElement} The rendered loading spinner component.
 *
 * Features:
 * - Centered spinner with animation for visual feedback during loading.
 * - Includes an accessible screen reader text (`sr-only`) for better accessibility.
 * - Styled with Tailwind classes for responsiveness and simplicity.
 */
export function Loading(): React.ReactElement {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900">
        <span className="sr-only">Chargement...</span>
      </div>
    </div>
  )
}

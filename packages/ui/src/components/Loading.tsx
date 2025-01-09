export function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900">
        <span className="sr-only">Chargement...</span>
      </div>
    </div>
  )
}

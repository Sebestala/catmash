'use client'

import { Loading } from '@repo/ui'

/**
 * Loading component to display a loading spinner or animation while the page is loading.
 *
 * @returns {React.ReactElement} The rendered loading component.
 *
 * Features:
 * - Utilizes the `Loading` component from `@repo/ui` to show a consistent loading indicator.
 */
export default function LoadingPage(): React.ReactElement {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  )
}

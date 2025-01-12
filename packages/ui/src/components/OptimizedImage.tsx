import Image from 'next/image'
import { memo } from 'react'

interface OptimizedImageProps {
  url: string | undefined
  rank: number
  sizes: string
  className: string
  style?: React.CSSProperties
}

/**
 * OptimizedImage component renders an optimized image for a ranked cat with responsive sizing and performance optimizations.
 *
 * @param {string | undefined} url - The URL of the image to display.
 * @param {number} rank - The rank of the cat, used to determine loading priority.
 * @param {string} sizes - Responsive sizes attribute for the image.
 * @param {string} className - Additional CSS classes for styling the image.
 * @param {React.CSSProperties} [style] - Optional inline styles for the image.
 *
 * @returns {React.ReactElement} The rendered optimized image component.
 *
 * Features:
 * - Prioritizes loading for higher-ranked cats (rank <= 11).
 * - Accepts custom styling through `className` and `style` props.
 */
export const OptimizedImage = memo(function OptimizedImage({
  url,
  rank,
  sizes,
  className,
  style
}: OptimizedImageProps) {
  const isGif = url?.toLowerCase().endsWith('.gif') ?? false

  return (
    <Image
      src={url || ''}
      alt={`Chat mignon ${rank}`}
      sizes={sizes}
      className={className}
      style={style}
      fill
      loading={rank <= 11 ? 'eager' : 'lazy'}
      priority={rank <= 11}
      unoptimized={!isGif}
    />
  )
})

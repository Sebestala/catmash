import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names into a single string, with Tailwind class conflict resolution.
 *
 * @param {...ClassValue[]} inputs - An array of class names or conditional class objects.
 * @returns {string} A single merged string of class names.
 *
 * Features:
 * - Resolves Tailwind class conflicts using `tailwind-merge`.
 *
 * Example:
 * ```typescript
 * const className = cn('bg-red-500', condition && 'text-white', 'p-4');
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

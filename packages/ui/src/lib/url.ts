export function transformToProtocolRelativeUrl(url: string) {
  if (url.startsWith('//')) {
    return url
  }

  const parsedUrl = new URL(url)
  return (
    '//' +
    parsedUrl.host +
    parsedUrl.pathname +
    parsedUrl.search +
    parsedUrl.hash
  )
}

export const getImagePath = (path) => {
  const cleanPath = path.replace(/^\/?(davydfontoura-dev\/)?/, '')
  
  const isVercel = window.location.hostname.includes('vercel.app')
  const isGitHubPages = window.location.hostname.includes('github.io')
  
  if (isVercel) {
    return `/${cleanPath}`
  } else if (isGitHubPages) {
    return `/davydfontoura-dev/${cleanPath}`
  } else {
    return `/${cleanPath}`
  }
}

export const getBaseUrl = () => {
  const isVercel = window.location.hostname.includes('vercel.app')
  const isGitHubPages = window.location.hostname.includes('github.io')
  
  if (isVercel) {
    return `https://${window.location.hostname}`
  } else if (isGitHubPages) {
    return 'https://davydfontourac.github.io/davydfontoura-dev'
  } else {
    return `${window.location.protocol}//${window.location.host}`
  }
}
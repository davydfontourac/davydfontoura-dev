import { useEffect } from 'react'

const useSEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical,
  structuredData
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (selector, content, property = 'content') => {
      if (!content) return
      
      let element = document.querySelector(selector)
      if (element) {
        element.setAttribute(property, content)
      } else {
        // Create new meta tag if it doesn't exist
        element = document.createElement('meta')
        
        // Determine if it's a property or name attribute
        if (selector.includes('property=')) {
          const propertyName = selector.match(/property="([^"]+)"/)?.[1]
          if (propertyName) {
            element.setAttribute('property', propertyName)
          }
        } else if (selector.includes('name=')) {
          const nameValue = selector.match(/name="([^"]+)"/)?.[1]
          if (nameValue) {
            element.setAttribute('name', nameValue)
          }
        }
        
        element.setAttribute('content', content)
        document.head.appendChild(element)
      }
    }

    // Update basic meta tags
    updateMetaTag('meta[name="description"]', description)
    updateMetaTag('meta[name="keywords"]', keywords)

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', ogTitle || title)
    updateMetaTag('meta[property="og:description"]', ogDescription || description)
    updateMetaTag('meta[property="og:image"]', ogImage)
    updateMetaTag('meta[property="og:url"]', ogUrl)

    // Update Twitter tags
    updateMetaTag('meta[property="twitter:title"]', twitterTitle || ogTitle || title)
    updateMetaTag('meta[property="twitter:description"]', twitterDescription || ogDescription || description)
    updateMetaTag('meta[property="twitter:image"]', twitterImage || ogImage)

    // Update canonical URL
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]')
      if (linkElement) {
        linkElement.setAttribute('href', canonical)
      } else {
        linkElement = document.createElement('link')
        linkElement.setAttribute('rel', 'canonical')
        linkElement.setAttribute('href', canonical)
        document.head.appendChild(linkElement)
      }
    }

    // Update structured data
    if (structuredData) {
      // Remove existing structured data
      const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]')
      if (existingScript) {
        existingScript.remove()
      }

      // Add new structured data
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-dynamic', 'true')
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }

    // Cleanup function
    return () => {
      // Reset to default title when component unmounts
      document.title = 'Davyd Fontoura - Desenvolvedor Front-End | Portfólio'
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, twitterTitle, twitterDescription, twitterImage, canonical, structuredData])
}

export default useSEO
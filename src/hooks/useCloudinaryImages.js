import { useState, useEffect } from 'react'
import { supabase } from '../integrations/supabase/client'
import { getFolderName, filterAndOrderImages } from '../utils/cloudinary'

/** Module-level cache to avoid refetching */
const cache = new Map()

/**
 * Hook to fetch all image URLs from a Cloudinary folder via edge function.
 * @param {string} folder - Folder name (product ID or raw folder name)
 * @param {object} [options]
 * @param {boolean} [options.isRawFolder] - If true, use folder as-is (don't map via productIdToFolder)
 * @returns {{ images: string[], loading: boolean, error: string|null }}
 */
export function useCloudinaryImages(folder, options = {}) {
  const resolvedFolder = options.isRawFolder ? folder : getFolderName(folder)
  const [images, setImages] = useState(() => cache.get(resolvedFolder) || [])
  const [loading, setLoading] = useState(!cache.has(resolvedFolder))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!resolvedFolder) return
    if (cache.has(resolvedFolder)) {
      setImages(cache.get(resolvedFolder))
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    supabase.functions.invoke('cloudinary-images', {
      body: { folder: resolvedFolder }
    }).then(({ data, error: fnError }) => {
      if (cancelled) return
      if (fnError) {
        console.error('Cloudinary images error:', fnError)
        setError(fnError.message || 'Failed to fetch images')
        setLoading(false)
        return
      }
      const allUrls = data?.images || []
      const filteredUrls = allUrls.filter(url => {
        const ext = url.split('.').pop()?.toLowerCase() || ''
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg', 'bmp', 'tiff'].includes(ext)
      })
      const imageUrls = filterAndOrderImages(folder, filteredUrls)
      cache.set(resolvedFolder, imageUrls)
      setImages(imageUrls)
      setLoading(false)
    }).catch((err) => {
      if (cancelled) return
      console.error('Cloudinary images error:', err)
      setError(err.message || 'Failed to fetch images')
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [resolvedFolder])

  return { images, loading, error }
}

export default useCloudinaryImages

import { useState, useEffect } from 'react'

function useDeviceType() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth <= 768 ? 'mobile' : 'desktop')
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Return 'mobile' as default during SSR to prevent hydration mismatch
  return deviceType ?? 'mobile'
}

export default useDeviceType
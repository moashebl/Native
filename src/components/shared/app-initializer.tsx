'use client'
import React, { useEffect } from 'react'
import useSettingStore from '@/hooks/use-setting-store'
import { ClientSetting } from '@/types'

export default function AppInitializer({
  setting,
  children,
}: {
  setting: ClientSetting
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize the store only once on mount
    useSettingStore.setState({ setting })
  }, [setting])

  return <>{children}</>
}
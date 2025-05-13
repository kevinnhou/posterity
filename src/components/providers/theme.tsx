"use client"

import type { ThemeProviderProps } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"
import { createContext, use, useEffect, useState } from "react"
import type { ReactNode } from "react"

interface ThemeContextType {
  activeTheme: string
  setActiveTheme: (theme: string) => void
}

const COOKIE_NAME = "active_theme"
const DEFAULT_THEME = "mono"

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function setThemeCookie(theme: string) {
  if (typeof window === "undefined") return

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === "https:" ? "Secure;" : ""}`
}

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme?: string
}) {
  const [activeTheme, setActiveTheme] = useState<string>(
    () => initialTheme || DEFAULT_THEME,
  )

  useEffect(() => {
    setThemeCookie(activeTheme)

    // biome-ignore lint/complexity/noForEach: ignore
    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className)
      })
    document.body.classList.add(`theme-${activeTheme}`)
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled")
    }
  }, [activeTheme])

  const value = React.useMemo(
    () => ({ activeTheme, setActiveTheme }),
    [activeTheme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}

export function useThemeConfig() {
  const context = use(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within an ActiveThemeProvider")
  }
  return context
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

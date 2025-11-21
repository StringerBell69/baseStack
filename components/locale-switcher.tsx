"use client"

import { useRouter, usePathname } from "next/navigation"
import { locales, localeNames, type Locale } from "@/i18n/config"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: Locale) => {
    // Remove the current locale from the pathname
    const segments = pathname.split("/").filter(Boolean)
    if (locales.includes(segments[0] as Locale)) {
      segments.shift()
    }

    // Add the new locale
    const newPath = `/${newLocale}/${segments.join("/")}`
    router.push(newPath)
  }

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {localeNames[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

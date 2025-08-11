// src/entities/navigation.ts
import type { RouteName } from '@/entities/route'
import { routes } from '@/entities/route'

export type NavItem = {
  name: RouteName
  path: string
  label: string
  icon?: string
}

export const globalNavItems: NavItem[] = [
  { name: 'home', path: routes.home, label: 'Home' },
  { name: 'about', path: routes.about, label: 'About' },
  { name: 'news', path: routes.news, label: 'News' },
  // 必要に応じてiconや外部リンクも追加
]

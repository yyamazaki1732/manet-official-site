/**
 * 2階層目のページ名
 */
export const secondLayerNames = [
  'home',
  'about',
  'news',
] as const

export type SecondLayerNames = (typeof secondLayerNames)[number]

export const routeNames = [
  ...secondLayerNames,
] as const
export type RouteName = typeof routeNames[number]

export const routes = {
  home: `/`,
  about: `/about`,
  news: `/news`,
} satisfies Record<RouteName, string>

type PrefixWithSlash<T extends string> = `/${T}`
type SecondLayerNamesWithSlash = PrefixWithSlash<Exclude<SecondLayerNames, 'home'>>
export type AllLayerNamesWithSlash = SecondLayerNamesWithSlash | '/'

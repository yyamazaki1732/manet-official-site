/**
 * 2階層目のページ名
 */
export const secondLayerNames = [
  'top',
  'about',
  'news',
] as const

export type SecondLayerNames = (typeof secondLayerNames)[number]

export const routeNames = [
  ...secondLayerNames,
] as const
export type RouteName = typeof routeNames[number]

export const routes = {
  top: `/`,
  about: `/about`,
  news: `/news`,
} satisfies Record<RouteName, string>

type PrefixWithSlash<T extends string> = `/${T}`
type SecondLayerNamesWithSlash = PrefixWithSlash<Exclude<SecondLayerNames, 'top'>>
export type AllLayerNamesWithSlash = SecondLayerNamesWithSlash | '/'

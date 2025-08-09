<script setup lang="ts">
import type { Graph, WebPage, BreadcrumbList, Organization, WebSite } from 'schema-dts'
import { snsLinks } from '@/entities/sns'

// パンくずリストノード
const breadcrumbs: BreadcrumbList = {
  '@type': 'BreadcrumbList',
  '@id': 'https://ochanomizu.cc/about/#breadcrumb',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': $t('home.subject'),
      'item': { '@id': 'https://ochanomizu.cc/' },
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': $t('about.subject'),
      'item': { '@id': 'https://ochanomizu.cc/about/' },
    },
  ],
}

// WebPageノード
const webPage: WebPage = {
  '@type': 'WebPage',
  '@id': 'https://ochanomizu.cc/about/#webpage',
  'url': 'https://ochanomizu.cc/about/',
  'name': $t('about.subject'),
  'description': $t('about.meta_description'),
  'isPartOf': { '@id': 'https://ochanomizu.cc/#website' },
  'breadcrumb': { '@id': 'https://ochanomizu.cc/about/#breadcrumb' },
  'about': { '@id': 'https://ochanomizu.cc/#brand' },
  'publisher': { '@id': 'https://ochanomizu.cc/#organization' },
  'primaryImageOfPage': {
    '@type': 'ImageObject',
    '@id': `/assets/img/about-fv-pc.jpg`,
    'contentUrl': `/assets/img/about-fv-pc.jpg`,
    'url': `/assets/img/about-fv-pc.jpg`,
    'width': '2880',
    'height': '1800',
    'caption': $t('about.image_caption'),
  },
  'image': [
    {
      '@type': 'ImageObject',
      '@id': `/assets/img/about-fv-pc.jpg`,
      'contentUrl': `/assets/img/about-fv-pc.jpg`,
      'url': `/assets/img/about-fv-pc.jpg`,
      'width': '2880',
      'height': '1800',
      'caption': $t('about.image_caption'),
    },
  ],
}

// Organizationノード（例: i18n値が不要な場合は静的定義）
const organization: Organization = {
  '@type': 'Organization',
  '@id': 'https://ochanomizu.cc/#organization',
  'name': 'MARO17',
  'url': 'https://ochanomizu.cc/',
  // ...その他プロパティ
}

// Websiteノード
const website: WebSite = {
  '@type': 'WebSite',
  '@id': 'https://ochanomizu.cc/#website',
  'name': 'MARO17公式サイト',
  'url': 'https://ochanomizu.cc/',
  'publisher': { '@id': 'https://ochanomizu.cc/#organization' },
  'inLanguage': ['ja', 'en'],
  'sameAs': [
    ...snsLinks.map(link => link.link),
  ],
  'alternateName': 'OCC',
}

function jsonld(): Graph {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      website,
      breadcrumbs,
      webPage,
    ],
  } satisfies Graph
}

useJsonld(jsonld())
</script>

interface WPAPIRaw {
  __v_isShallow: boolean
  __v_isRef: boolean;
  dep?: unknown
}

export type WPCategoriesData = WPAPIRaw & {
  _rawValue: WPCategory[]
}

export type WPArticleData = WPAPIRaw & {
  _rawValue: WPArticle[]
}

export type WPPageData = WPAPIRaw & {
  _rawValue: WPPage[]
}


export type WPCategory = {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  parent: number
  meta: unknown[]
}

export type WPArticle = {
  id: number
  date: string
  modified: string
  slug:string
  status: string
  title: {
    rendered:string
  },
  content: {
    rendered: string
  },
  excerpt: {
    rendered:  string
  },
  categories: number[]
}

export type WPPage = {
  id: number
  date: string
  modified: string
  slug:string
  status: string
  title: {
    rendered:string
  },
  content: {
    rendered: string
  },
  excerpt: {
    rendered:  string
  },
  categories: number[]
}
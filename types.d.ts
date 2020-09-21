declare global {
  interface Window {
    dataLayer: any
    loadlive2d: any
  }
}

export interface MarkdownFrontMatter {
  title?: string
  slug: string
  date: string
  tags: string[]
  thumbnail?: string
}

export type MarkdownRawData = MarkdownFrontMatter & {
  content: string
  prev?: string
  next?: string
}

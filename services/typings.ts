export interface NotionPage {
  properties: Record<string, any>
  blocks: any[]
}

export interface TextAnnotations {
  bold: boolean
  italic: boolean
  code: boolean
  color: string
  strikethrough: boolean
  underline: boolean
}

export interface TextBlock {
  annotations: TextAnnotations
  text: {
    link?: { url?: string }
    content: string
  }
  plain_text: string
  href: string | null
  type: 'text'
}

export interface NotionIcon {
  emoji: string
  type: 'emoji'
}

export interface ParagraphBlock {
  text: TextBlock[]
}

export interface CodeBlock {
  text: TextBlock[]
  language: string
}

export interface CalloutBlock {
  icon: NotionIcon
  text: TextBlock[]
}

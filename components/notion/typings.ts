export interface NotionPageBlock {
  properties: Record<string, any>
  blocks: any[]
  recordMap: any
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

export type NotionBlockType =
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'paragraph'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'to_do'
  | 'toggle'
  | 'code'
  | 'divider'
  | 'callout'
  | 'quote'
  | 'toggle'
  | 'image'
  | 'video'
  | 'embed'
  | 'table'
  | 'child_page'
  | 'column_list'
  | 'unsupported'

export type NotionBlock = {
  id: string
  type: NotionBlockType
  created_time: string
  has_children: boolean
  last_edited_time: string
  archived: boolean
  object: 'block'
  block_children?: NotionBlock[]
} & Record<NotionBlockType, { text: TextBlock[] }>

export interface ParagraphBlock {
  text: TextBlock[]
}

export type ListBlock =
  | {
      text: TextBlock[]
    }
  | Array<{ text: TextBlock[] }>

export type TodoListBlock =
  | {
      checked?: boolean
      text: TextBlock[]
    }
  | Array<{ checked?: boolean; text: TextBlock[] }>

export interface CodeBlock {
  text: TextBlock[]
  language: string
}

export interface CalloutBlock {
  icon: NotionIcon
  text: TextBlock[]
}

export interface ImageBlock {
  caption: TextBlock[]
  file: {
    expiry_time: string
    url: string
  }
  external?: {
    url: string
  }
  type: 'file' | 'external'
}

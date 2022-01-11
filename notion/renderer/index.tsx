import { FC, Fragment } from 'react'
import Text from './Text'
import Divider from './Divider'
import Heading from './Heading'
import Paragraph from './Paragraph'
import Code from './Code'
import Callout from './Callout'
import BulletedList from './BulletedList'
import NumberList from './NumberList'
import ColumnList from './ColumnList'
import Image from './Image'
import { CalloutBlock, CodeBlock, NotionBlock } from '../typings'
import TodoList from './TodoList'

export const renderBlock = (block: NotionBlock) => {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'heading_1':
      return <Heading level={1}>{value}</Heading>
    case 'heading_2':
      return <Heading level={2}>{value}</Heading>
    case 'heading_3':
      return <Heading level={3}>{value}</Heading>
    case 'paragraph':
      return <Paragraph>{value}</Paragraph>
    case 'bulleted_list_item':
      return <BulletedList>{value}</BulletedList>
    case 'numbered_list_item':
      return <NumberList>{value}</NumberList>
    case 'to_do':
      return <TodoList>{value}</TodoList>
    case 'code':
      return <Code>{value as CodeBlock}</Code>
    case 'divider':
      return <Divider />
    case 'callout':
      return <Callout>{value as CalloutBlock}</Callout>
    case 'column_list':
      return <ColumnList>{block.block_children as any}</ColumnList>
    case 'quote':
      return <blockquote key={id}>{value.text[0].plain_text}</blockquote>
    case 'image':
      return <Image>{value as any}</Image>
    case 'toggle':
      return (
        <details>
          <summary>
            <Text>{value as any}</Text>
          </summary>
          {(value as any).children?.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      )
    default:
      return (
        <p>
          {`❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`}
        </p>
      )
  }
}

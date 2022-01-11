import Divider from './Divider'
import Heading from './Heading'
import Paragraph from './Paragraph'
import Code from './Code'
import Text from './Text'
import Callout from './Callout'

const renderBlock = (block: any) => {
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
    case 'numbered_list_item':
      return (
        <li>
          <Text>{value.text}</Text>
        </li>
      )
    case 'code':
      return <Code>{value}</Code>
    case 'divider':
      return <Divider />
    case 'callout':
      return <Callout>{value}</Callout>
    case 'quote':
      return <blockquote key={id}>{value.text[0].plain_text}</blockquote>
    // case 'to_do':
    //   return (
    //     <div>
    //       <label htmlFor={id}>
    //         <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
    //         <Text text={value.text} />
    //       </label>
    //     </div>
    //   )
    // case 'toggle':
    //   return (
    //     <details>
    //       <summary>
    //         <Text text={value.text} />
    //       </summary>
    //       {value.children?.map((block: any) => (
    //         <Fragment key={block.id}>{renderBlock(block)}</Fragment>
    //       ))}
    //     </details>
    //   )
    // case 'child_page':
    //   return <p>{value.title}</p>
    // case 'image':
    //   const src = value.type === 'external' ? value.external.url : value.file.url
    //   const caption = value.caption ? value.caption[0].plain_text : ''
    //   return (
    //     <figure>
    //       <img src={src} alt={caption} />
    //       {caption && <figcaption>{caption}</figcaption>}
    //     </figure>
    //   )
    default:
      return (
        <p>
          {`❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`}
        </p>
      )
  }
}

export default renderBlock

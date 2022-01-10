import { ElementType, FC } from 'react'
import Text from './Text'
import { ParagraphBlock } from '../../services/typings'

const Heading: FC<{ level: 1 | 2 | 3; children: ParagraphBlock }> = ({ level, children }) => {
  const HeadingTag: ElementType = `h${level}`

  const getClassName = (level: 1 | 2 | 3) => {
    if (level === 1) {
      return ['my-4', 'text-3xl', 'font-bold'].join(' ')
    }
    if (level === 2) {
      return ['my-3', 'text-2xl', 'font-semibold'].join(' ')
    }

    return ['my-2', 'text-xl', 'font-medium'].join(' ')
  }

  return (
    <HeadingTag className={getClassName(level)}>
      <Text>{children.text}</Text>
    </HeadingTag>
  )
}

export default Heading

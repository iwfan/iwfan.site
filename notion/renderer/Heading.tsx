import { ElementType, FC } from 'react'
import Text from './Text'
import { ParagraphBlock } from '../../notion/typings'

const Heading: FC<{ level: 1 | 2 | 3; children: ParagraphBlock }> = ({ level, children }) => {
  const HeadingTag: ElementType = `h${level}`

  const getClassName = (level: 1 | 2 | 3) => {
    const fontBoldClass = ['font-bold', 'font-semibold', 'font-medium']
    const fontSizeClass = ['text-3xl', 'text-2xl', 'text-xl']
    const spacingClass = ['my-4', 'my-3', 'my-2']

    return [fontBoldClass[level - 1], fontSizeClass[level - 1], spacingClass[level - 1]].join(' ')
  }

  return (
    <HeadingTag className={getClassName(level)}>
      <Text>{children.text}</Text>
    </HeadingTag>
  )
}

export default Heading

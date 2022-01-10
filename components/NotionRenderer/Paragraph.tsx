import { FC } from 'react'
import Text from './Text'
import { ParagraphBlock } from '../../services/typings'

const Paragraph: FC<{ children: ParagraphBlock }> = ({ children }) => {
  return (
    <p className="my-3">
      <Text>{children.text}</Text>
    </p>
  )
}

export default Paragraph

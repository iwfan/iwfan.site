import { ElementType, FC } from 'react'
import Text from './Text'
import { ParagraphBlock } from '../../services/typings'

const BulletedList: FC<{ children: ParagraphBlock }> = ({ children }) => {
  return <ul></ul>
}

export default BulletedList

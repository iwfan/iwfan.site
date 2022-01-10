import { FC } from 'react'
import Text from './Text'
import { CalloutBlock } from '../../services/typings'

const Callout: FC<{ children: CalloutBlock }> = ({ children }) => {
  return (
    <div>
      <Text>{children.text}</Text>
    </div>
  )
}

export default Callout

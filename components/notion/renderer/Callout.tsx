import { FC } from 'react'
import Text from './Text'
import { CalloutBlock } from '../../notion/typings'

const Callout: FC<{ children: CalloutBlock }> = ({ children }) => {
  return (
    <div>
      <Text>{children.text}</Text>
    </div>
  )
}

export default Callout

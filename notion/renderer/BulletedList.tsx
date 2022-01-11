import { FC } from 'react'
import Text from './Text'
import { ListBlock } from '../typings'

const BulletedList: FC<{ children: ListBlock }> = ({ children }) => {
  const items = Array.isArray(children) ? children : [children]

  return (
    <ul className="list-disc list-inside my-2">
      {items.map((item, index) => (
        <li key={index}>
          <Text>{item.text}</Text>
        </li>
      ))}
    </ul>
  )
}

export default BulletedList

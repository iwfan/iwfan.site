import { FC, Fragment } from 'react'
import Text from './Text'
import { TodoListBlock } from '../typings'

const TodoList: FC<{ children: TodoListBlock }> = ({ children }) => {
  const items = Array.isArray(children) ? children : [children]

  return (
    <dl className="grid grid-cols-12 my-2">
      {items.map((item, index) => (
        <Fragment key={index}>
          <dt>
            <input type="checkbox" defaultChecked={item.checked} />
          </dt>
          <dd className="col-span-11">
            <Text>{item.text}</Text>
          </dd>
        </Fragment>
      ))}
    </dl>
  )
}

export default TodoList

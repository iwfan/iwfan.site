import { FC } from 'react'
import { CodeBlock } from '../../services/typings'

const Code: FC<{ children: CodeBlock }> = ({ children }) => {
  return (
    <pre>
      {children.text.map((block, idx) => (
        <code key={idx}>{block.plain_text}</code>
      ))}
    </pre>
  )
}

export default Code

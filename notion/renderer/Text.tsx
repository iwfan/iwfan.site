import { FC } from 'react'
import cx from 'classnames'
import { TextBlock } from '../../notion/typings'

const Text: FC<{ children?: TextBlock[] }> = ({ children }) => {
  if (!children) {
    return null
  }

  return (
    <>
      {children.map((value, idx) => {
        const { annotations: { bold, code, color, italic, strikethrough, underline } = {}, text } =
          value

        if (text.link) {
          return (
            <a key={idx} href={text.link.url} target="_blank" rel="noreferrer">
              {text.content}
            </a>
          )
        }
        if (code) {
          return (
            <code
              key={idx}
              className="inline-block border border-border_light px-1 m-1 rounded-lg text-fg"
            >
              {text.content}
            </code>
          )
        }

        return (
          <span
            key={idx}
            className={cx({
              'font-bold': bold,
              italic,
              'line-through': strikethrough,
              underline,
            })}
            style={color !== 'default' ? { color } : {}}
          >
            {text.content}
          </span>
        )
      })}
    </>
  )
}

export default Text

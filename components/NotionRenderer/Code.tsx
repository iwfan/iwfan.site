import { FC } from 'react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { CodeBlock } from '../../services/typings'

const Code: FC<{ children: CodeBlock }> = ({ children }) => {
  const { language, text } = children
  const value = text[0].plain_text

  const lineNumber = value.split('\n').length

  const showLineNumbersLanguage = ['javascript', 'typescript']

  const showLineNumbers = showLineNumbersLanguage.includes(language) && lineNumber >= 10

  return (
    <SyntaxHighlighter
      className={`${language} font-mono`}
      language={language}
      useInlineStyles={false}
      showLineNumbers={showLineNumbers}
      wrapLongLines={true}
    >
      {value}
    </SyntaxHighlighter>
  )
}

export default Code

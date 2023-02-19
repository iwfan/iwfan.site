import { FC } from 'react'
import { ImageBlock } from '../../notion/typings'

const Image: FC<{ children: ImageBlock }> = ({ children }) => {
  const src = children.type === 'external' ? children.external!.url : children.file.url
  const caption = children.caption?.[0]?.plain_text ?? ''
  return (
    <figure className="mb-3">
      <img className="rounded-md object-center object-fill" src={src} alt={caption} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default Image

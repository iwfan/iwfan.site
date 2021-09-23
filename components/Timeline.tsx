import { FC } from 'react'

interface TimelineProps {
  layout?: string
}

interface TimelineItemProps {
  className?: string
}

const Timeline: FC<TimelineProps> & { Item: FC<TimelineItemProps> } = props => {
  return <ol>{props.children}</ol>
}

Timeline.Item = props => {
  return (
    <li>
      <div>
        <div className={'w-1px h-full'} />
        <div />
      </div>
      <div className={'bg-red-100 rounded-md'}>
        <div className={'m-10 p-6'}>{props.children}</div>
      </div>
    </li>
  )
}

Timeline.Item.displayName = 'TimelineItem'

export { Timeline }

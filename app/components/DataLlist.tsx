import cx from 'classnames'

type DataListProps<T> = {
  list: T[]
  children: (item: T) => JSX.Element
}

const DataList = <T extends unknown>(props: DataListProps<T>) => {
  const { list, children } = props
  return (
    <ol className="border border-border rounded-md">
      {list.map((item, idx) => (
        <li
          key={idx}
          className={cx(
            'group relative border-b border-b-border first:rounded-t-md last:rounded-b-md',
            'transition-colors hover:bg-light'
          )}
        >
          {children(item)}
          <div className="absolute h-full left-0 top-0 w-0 bg-bar shadow-emanate rounded-l-md group-hover:w-1" />
        </li>
      ))}
    </ol>
  )
}

export default DataList

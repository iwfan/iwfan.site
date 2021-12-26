import React, { forwardRef, ForwardRefRenderFunction, PropsWithChildren } from 'react'
import cx from 'classnames'

interface ContainerProps {
  tag?: keyof JSX.IntrinsicElements
  wrapClassName?: string
  className?: string
  wrapStyle?: React.CSSProperties
}

const ContainerRender: ForwardRefRenderFunction<HTMLDivElement, ContainerProps> = (
  { tag: Wrapper = 'div', wrapClassName, wrapStyle, className, children },
  ref
) => {
  return (
    <Wrapper className={wrapClassName} style={wrapStyle}>
      <div
        className={cx('px-6 lg:mx-auto lg:max-w-screen-lg', 'lg:px-3 xl:px-0', className)}
        ref={ref}
      >
        {children}
      </div>
    </Wrapper>
  )
}

export const Container = forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(
  ContainerRender
)

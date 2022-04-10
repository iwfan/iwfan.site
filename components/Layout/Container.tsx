import React, { ElementType, forwardRef, ForwardRefRenderFunction, PropsWithChildren } from 'react'
import cx from 'classnames'

interface ContainerProps {
  tag?: ElementType
  className?: string
  style?: React.CSSProperties
}

const ContainerRender: ForwardRefRenderFunction<HTMLElement, PropsWithChildren<ContainerProps>> = (
  { tag: Wrapper = 'div', style, className, children },
  ref
) => (
  <Wrapper
    className={cx(className, 'px-4 md:px-6 lg:px-0 w-full max-w-screen-lg mx-auto')}
    style={style}
    ref={ref}
  >
    {children}
  </Wrapper>
)

export const Container = forwardRef<HTMLElement, PropsWithChildren<ContainerProps>>(ContainerRender)

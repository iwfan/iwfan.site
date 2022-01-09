import React, { ElementType, forwardRef, ForwardRefRenderFunction, PropsWithChildren } from 'react'
import cx from 'classnames'

interface ContainerProps {
  tag?: ElementType
  className?: string
  style?: React.CSSProperties
}

const ContainerRender: ForwardRefRenderFunction<HTMLElement, ContainerProps> = (
  { tag: Wrapper = 'div', style, className, children },
  ref
) => (
  <Wrapper className={cx(className, 'w-full max-w-screen-lg mx-auto')} style={style} ref={ref}>
    {children}
  </Wrapper>
)

export const Container = forwardRef<HTMLElement, PropsWithChildren<ContainerProps>>(ContainerRender)

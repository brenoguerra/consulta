import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  isErrored: boolean;
}

const Button: React.FC<ButtonProp> = ({ isLoading, isErrored, children, ...rest }) => (
  <Container type="button" {...rest} isLoading={isLoading} isErrored={isErrored}>
    {children}
  </Container>
)

export default Button

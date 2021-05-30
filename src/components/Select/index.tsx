import React, { SelectHTMLAttributes, useRef, useEffect } from 'react'
import { useField } from '@unform/core'

import { Container } from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
}

const Select: React.FC<SelectProps> = ({ name, children, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value'
    })
  }, [registerField, fieldName])

  return (
    <Container
      ref={selectRef}
      defaultValue={defaultValue}
      {...rest}
    >
      {children}
    </Container>
  )
}

export default Select

import styled, { css } from 'styled-components'

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<InputProps>`
  display: flex;
  align-items: center;
  /* box-shadow: 0 0 10px rgba(0, 0, 0); */

  background: #333;
  border-radius: 6px;
  padding: 12px;
  width: 100%;

  border: 2px solid #555;
  color: #666360;

  ${props => props.isFocused && css`
    color: #ff9ee3;
    border: double 2px transparent;
    border-radius: 6px;
    background-image: linear-gradient(#444, #444),
                      linear-gradient(to right, #9592ff, #ff9ee3);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  `}

  ${props => props.isFilled && css`
    color: #ff9ee3;
  `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #fff;

    ::placeholder {
      color: #666360;
    }
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  svg {
    margin-right: 16px;
  }
`

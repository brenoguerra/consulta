import styled, { css, keyframes } from 'styled-components'

interface ButtonProps {
  isLoading: boolean;
  isErrored: boolean;
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  background-image: linear-gradient(to right, #9592ff, #ff9ee3);
  border-radius: 4px;
  border: 0;
  padding: 10px;
  color: #fff;
  width: 100%;
  transition: filter 0.2s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-size: 18px;

  &:hover {
    filter: brightness(0.9);
    cursor: pointer;
  }

  svg {
    margin-right: 8px;
    font-size: 85%;
  }

  ${props => props.isErrored && css `
    background: #E84848;
    transition: background .7s ease-out;
    /* webkittra: "all .5s ease",
    MozTransition: "all .5s ease" */
  `};

  ${props => props.isLoading && !props.isErrored && css`
    @keyframes spin {
      from {
        transform:rotate(0deg);
      }
      to {
        transform:rotate(360deg);
      }
    }

    filter: brightness(0.5);

    :hover {
      cursor: not-allowed;
      filter: brightness(0.6);
    }

    svg {
      animation: spin 2s linear infinite;
    }
  `};
`

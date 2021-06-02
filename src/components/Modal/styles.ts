import styled, { keyframes, css } from 'styled-components'

interface SelectButtonProps{
  selected?: boolean;
}

export const animation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 2s linear, max-height 0s linear 0s;

  animation: ${animation} 1s;
`

export const Content = styled.div`
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  background-color: #333;
  opacity: 0.8;
  margin: 76px 20px 0 20px;

  width: 100%;
  max-width: 90%;
  height: 100%;
  max-height: 80%;

  color: #ff9ee3;
  border: double 2px transparent;
  border-radius: 4px 4px 10px 10px;
  background-image: linear-gradient(#333, #333),
                    linear-gradient(to right, #9592ff, #ff9ee3);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-bottom: none;
  border-left: none;
  border-right: none;

  > button {
    display: flex;
    position: relative;
    align-items: center;

    background-color: transparent;
    outline: none;
    border-style: none;
    width: 32px;
    height: 32px;
    right: calc(-100% + 30px);
    top: 10px;
    cursor: pointer;

    &::before,
    &::after {
      content: ' ';
      position: absolute;
      width: 2px;
      height: 24px;
      background-color: white;
    }
    &::before {
      transform: rotate(-45deg);
    }
    &::after {
      transform: rotate(45deg);
    }
  }
`

export const SelectBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: -15px 22px;

  border: double 2px transparent;
  border-radius: 0 0 0 2px;
  background-image: linear-gradient(#333, #333),
                    linear-gradient(to right, #9592ff, #ff9ee3);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-top: none;
  border-left: none;
  border-right: none;
`

export const SelectButton = styled.div<SelectButtonProps>`
  display: flex;
  align-items: row;
  align-items: center;
  text-align: center;

  background: transparent;
  color: white;
  border-style: none;
  font-size: 18px;

  padding: 6px 12px;

  svg {
    font-size: 20px;
    margin-right: 8px;
  }

  @media (max-width: 1000px) {
    font-size: 0;

    :hover {
      animation: ${animation} 0.5s;
      font-size: 18px;

      svg {
        margin-right: 6px;
      }
    }

    svg {
      font-size: 20px;
      margin-right: 0;
    }
  }

  @media (max-width: 720px) {
    font-size: 0;;

    :hover {
      font-size: 0;

      svg {
        animation: none;
        margin-right: 0;
      }
    }

  ${props => props.selected && css`
    border: double 2px transparent;
    border-radius: 4px 4px 0 0;
    background-image: linear-gradient(#333, #333),
                      linear-gradient(to right, #9592ff, #ff9ee3);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    border-bottom: none;
  `}
`

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 30px 50px 30px;
  font-size: 16px;
  color: #fff;

  p + p {
    margin-top: 4px;
  }

  strong {
    font-size: 18px;
    margin-left: 4px;
  }
`

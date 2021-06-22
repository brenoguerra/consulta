import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;

  justify-content: center;
  padding: 8px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 405px;

  height: 426px;
  border-radius: 4px;

  background-color: #333;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.1);
`;

const opacityEffect = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const AnimationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${opacityEffect} 1s;

  form {
    margin: 50px 0 50px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 32px;
    }

    br {
      content: '';
      margin: 2em;
      display: block;
      font-size: 24%;
    }

    button {
      margin: 12px 0;
    }

    a {
      color: #fff;
      display: block;
      margin-top: 16px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#fff')};
      }
    }
  }

  > a {
    color: #fff;
    display: block;
    margin-top: -30px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9ee3')};
    }
  }
`;

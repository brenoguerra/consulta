import styled from 'styled-components'

export const Container = styled.select`
  width: 100%;
  height: 47px;

  font-size: 16px;
  background: #333;
  color: #fff;
  border-radius: 4px;
  border: 2px solid #555;
  padding: 0 20px 0 12px;

  :active {
    border: 1px solid #fff;color: #ff9ee3;
    border: double 2px transparent;
    border-radius: 6px;
    background-image: linear-gradient(#444, #444),
    linear-gradient(to right, #9592ff, #ff9ee3);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    color: #fff;
  }

  /* Remove do FireFox */
  text-indent: 0.01px;
  text-overflow: "";
  select::-ms-expand {
    display: none;
  }
`

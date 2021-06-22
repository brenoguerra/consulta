import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  padding: 10px 30px;

  form {
    display: column;
    margin-top: 80px;
    padding: 30px;

    width: 100%;
    max-width: 800px;
    height: auto;
    background: #333;
    border-radius: 6px;

    .inputs {
      display: flex;
      flex-direction: row;

      @media (max-width: 720px) {
        flex-direction: column;
      }

      align-items: center;
      justify-content: center;

      .searchType {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-right: 7px;

        @media (max-width: 720px) {
          margin-right: 0;
          margin-bottom: 7px;
        }

        .typeBox {
          width: 100%;
          overflow: hidden;
        }
      }
    }

    .searchInput {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-left: 7px;

      @media (max-width: 720px) {
        margin-left: 0;
        margin-top: 7px;
      }
    }

    p {
      margin-bottom: 8px;
    }

    .expireText {
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 12px;
      font-weight: 400;
    }
  }

  .searchButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 22px;

    button {
      height: 50px;
      width: 100%;
    }
  }

  .logoutButton {
    position: absolute;
    bottom: 50px;
    right: 50px;

    :hover {
      cursor: pointer;
    }
  }
`

export const SearchList = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 800px;
  height: auto;
`

export const Result = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  grid-gap: 40px;

  background: #333;
  width: 100%;
  height: auto;
  padding: 20px 30px;

  & + div {
    margin-top: 4px;
  }

  :first-child {
    border-radius: 6px 6px 0 0;
  }

  :last-child {
    border-radius: 0 0 6px 6px;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    display: flex;
    align-items: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: linear-gradient(to right, #9592ff, #ff9ee3);
    border-radius: 4px;
    border: 0;
    color: #fff;
    width: 90%;
    height: 32px;
    transition: filter 0.2s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    &:hover {
      filter: brightness(0.9);
      cursor: pointer;
    }

    svg {
      display: flex;
      margin-right: 8px;
      font-size: 85%;
    }

    @media (max-width: 720px) {
      p {
        display: none;
        font-size: 0;
      }

      svg{
        margin-right: 0;
      }
    }
  }
`

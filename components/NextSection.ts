import styled from 'styled-components';

interface NextSectionProps {
  white?: boolean;
}
const NextSection = styled.section<NextSectionProps>`
  padding: 48px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => (props.white ? '#f9f9f9' : '#292929')};
  h2,
  h4,
  a {
    margin: 0;
    text-align: center;
    padding: 0 32px;
    word-break: keep-all;
  }
  h2 {
    font-size: 1.56rem;
    font-weight: 500;
    color: ${(props) => (props.white ? 'black' : 'white')};
  }
  h4 {
    margin: 16px 0 48px 0;
    font-size: 1rem;
    font-weight: 400;
    color: ${(props) => (props.white ? 'black' : 'white')};
  }
  a {
    width: fit-content;
    display: flex;
    align-items: center;
    color: #007aff;
    svg {
      font-size: 1rem;
    }
    span {
      margin: 0 5px;
      font-size: 0.875rem;
      font-weight: 700;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  &.desktop {
    padding: 80px 0;
    h2 {
      font-size: 2.5rem;
    }
    h4 {
      margin: 32px 0 80px 0;
      font-size: 1.5625rem;
    }
    a {
      svg {
        font-size: 1rem;
      }
      span {
        margin: 0 10px;
        font-size: 1rem;
        font-weight: 700;
      }
    }
  }
  & + & {
    padding-top: 0;
  }
`;

export default NextSection;

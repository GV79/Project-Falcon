import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2rem 1rem;
  margin: 2rem;
  background-color: #f8f8f8;
  height: 100%;

  @media (max-width: 470px) {
    padding: 2rem;
    margin: 0;
    justify-content: center;
  }
`;

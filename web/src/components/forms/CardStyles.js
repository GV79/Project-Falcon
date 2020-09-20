import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const CardWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  width: 20rem;
  min-width: 20rem;
  margin: 0 1rem 2rem 1rem;
  height: 22.4375rem;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
`;

export const PropertiesWrapper = styled.div`
  display: flex;
  padding: 1rem 1rem;
  color: #393939;
`;
export const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem 0;
  border-top: 1px solid #e8e8e8;
`;

export const CardButton = styled(Button)`
  border-radius: 10px;
`;

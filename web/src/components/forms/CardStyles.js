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

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: contain;
  height: 15rem;
`;

export const ImageBackdrop = styled.div`
  background-color: black;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  color: #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

export const PropertiesWrapper = styled.div`
  display: flex;
  padding: 1rem 1rem;
  color: #393939;
`;

export const StatusText = styled.p`
  color: ${(props) => (props.status ? '#297329' : 'red')};
  margin: 0 0 0 0.5rem;
  font-weight: bold;
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

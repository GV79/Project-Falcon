import { Button, Grid } from '@material-ui/core';
import styled, { keyframes } from 'styled-components';

export const FormButton = styled(Button)`
  width: 9rem;
  margin: 0 0 1rem 1rem;
`;

export const Field = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #f8f8f8;
  align-items: center;
  padding: 0.5rem;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-bottom: 1rem;
  max-width: 60rem;

  @media (max-width: 480px) {
    width: 80%;
  }
`;

export const PropertiesGrid = styled(Grid)`
  background-color: #f8f8f8;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.141), 0 1px 3px 0 rgba(0, 0, 0, 0.122);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const pulsate = keyframes`
  0% {
    -webkit-transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.2, 1.2);
    opacity: 0;
  }
`;

export const Circle = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => (props.status ? '#62bd19' : '#a44444')};
  border-radius: 50%;
  position: relative;
  top: 9px;
  left: -34px;
`;
export const RingRing = styled.div`
  border: ${(props) => (props.status ? '3px solid #62bd19' : '3px solid #a44444')};
  border-radius: 30px;
  -webkit-border-radius: 30px;
  height: 25px;
  width: 25px;
  position: relative;
  top: 1px;
  left: -11px;
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  -webkit-animation: ${pulsate} 1s ease-out;
  -webkit-animation-iteration-count: infinite;
  opacity: 0;
`;

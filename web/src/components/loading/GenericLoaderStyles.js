import { Grid } from '@material-ui/core';
import styled from 'styled-components';

export const LoadingContainer = styled(Grid)`
  text-align: center;
  max-width: 60rem;
  width: 80%;
  padding-top: 10rem;
`;

export const LoadingText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #555;
`;

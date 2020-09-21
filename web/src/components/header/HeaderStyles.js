import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Title = styled(Typography)`
  display: block;
  flex-grow: 1;

  @media (max-width: 480px) {
    display: none;
  }
`;

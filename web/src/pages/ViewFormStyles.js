import { Grid } from '@material-ui/core';
import styled from 'styled-components';

export const FieldWrapper = styled(Grid)`
  margin-bottom: 1rem;
  max-width: 50rem;
`;

export const FieldLabel = styled.p`
  font-size: 1.1rem;
  color: #777;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
`;

export const HeaderWrapper = styled(Grid)`
  border-bottom: 2px solid #e8e8e8;
  margin-bottom: 3rem;
  text-align: center;
`;

export const FormDescription = styled.p`
  font-size: 1.5rem;
  color: #999;
  margin: 0 0 1rem 0;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const FormTitle = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: #555;
  margin: 0 0 0.5rem 0;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

import { Button, Grid } from '@material-ui/core';
import styled from 'styled-components';

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
  background-color: #e8e8e8;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.141), 0 1px 3px 0 rgba(0, 0, 0, 0.122);
  padding: 2rem;
  margin-bottom: 2rem;
`;

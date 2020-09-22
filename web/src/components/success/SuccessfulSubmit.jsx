import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const SuccessText = styled.h1`
  color: #4e9a59;
`;

const SuccessImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 20rem;
`;

export default function SuccessfulSubmit() {
  return (
    <Grid container justify='center' alignItems='center' direction='column' style={{ margin: '2rem 2rem' }}>
      <SuccessText>Thanks! Your form has been submitted!</SuccessText>
      <SuccessImage src='/images/submitted.svg' alt='form successfully submitted' />
    </Grid>
  );
}

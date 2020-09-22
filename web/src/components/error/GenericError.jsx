import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const ErrorText = styled.h1`
  color: #888;
`;

const ErrorImage = styled.img`
  width: 90%;
  height: auto;
  max-width: 60rem;
`;

export default function GenericError({ message = 'The requested page is unavailable.' }) {
  return (
    <Grid container justify='center' alignItems='center' direction='column' style={{ margin: '2rem 2rem' }}>
      <ErrorText>{message}</ErrorText>
      <ErrorImage src='/images/error.svg' alt='404' />
    </Grid>
  );
}

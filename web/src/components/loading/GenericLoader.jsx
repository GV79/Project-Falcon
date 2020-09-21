import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { LoadingContainer, LoadingText } from './GenericLoaderStyles';

export default function GenericLoader() {
  return (
    <LoadingContainer container direction='column' justify='center'>
      <LoadingText>Loading...</LoadingText>
      <LinearProgress />
    </LoadingContainer>
  );
}

import React from 'react';
import {
  CardButton,
  CardWrapper,
  ActionsWrapper,
  ImageBackdrop,
  ImageWrapper,
  PropertiesWrapper,
  StatusText,
} from './CardStyles';
import LinkIcon from '@material-ui/icons/Link';

export default function Card({ data: { id, title = '', description, status, link } }) {
  return (
    <CardWrapper>
      <ImageWrapper>
        <img
          src='/images/form.svg'
          alt='form placeholder'
          style={{ width: '100%', maxHeight: '15rem', position: 'absolute' }}
        />
        <ImageBackdrop>
          <strong>{title.toUpperCase()}</strong>
        </ImageBackdrop>
      </ImageWrapper>
      <PropertiesWrapper>
        <strong>Status:</strong>
        <StatusText status={status}>{status ? 'Live' : 'Offline'}</StatusText>
        {status && <LinkIcon style={{ cursor: 'pointer', marginLeft: 'auto' }} />}
      </PropertiesWrapper>
      <ActionsWrapper>
        <CardButton variant='contained' color='primary' size='small' disabled={!status}>
          Preview
        </CardButton>
        <CardButton variant='contained' color='primary' size='small'>
          {status ? 'Unpublish' : 'Publish'}
        </CardButton>
        <CardButton variant='contained' color='primary' size='small'>
          Edit
        </CardButton>
      </ActionsWrapper>
    </CardWrapper>
  );
}

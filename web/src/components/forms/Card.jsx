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
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export default function Card({ data: { uuid, title = '', description, status }, loading }) {
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/edit?id=${uuid}`);
  };

  const handlePreview = () => {
    history.push(`/view?id=${uuid}`);
  };

  const handleStatus = () => {};

  return (
    <CardWrapper>
      <ImageWrapper>
        <img
          src='/images/form.svg'
          alt='form placeholder'
          style={{ width: '100%', maxHeight: '15rem', position: 'absolute' }}
        />

        <ImageBackdrop>{loading ? <CircularProgress /> : <strong>{title.toUpperCase()}</strong>}</ImageBackdrop>
      </ImageWrapper>
      <PropertiesWrapper>
        {loading ? (
          <Skeleton width='100%' />
        ) : (
          <>
            <strong>Status:</strong>
            <StatusText status={status}>{status ? 'Live' : 'Offline'}</StatusText>
            {status && <LinkIcon style={{ cursor: 'pointer', marginLeft: 'auto' }} />}
          </>
        )}
      </PropertiesWrapper>
      <ActionsWrapper>
        <CardButton
          variant='contained'
          color='primary'
          size='small'
          disabled={!status || loading}
          onClick={handlePreview}
        >
          Preview
        </CardButton>
        <CardButton variant='contained' color='primary' size='small' onClick={handleStatus} disabled={loading}>
          {status ? 'Unpublish' : 'Publish'}
        </CardButton>
        <CardButton variant='contained' color='primary' size='small' onClick={handleEdit} disabled={loading}>
          Edit
        </CardButton>
      </ActionsWrapper>
    </CardWrapper>
  );
}

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

export default function Card({ data: { id, uuid, title = '', description, status, link } }) {
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
        <CardButton variant='contained' color='primary' size='small' disabled={!status} onClick={handlePreview}>
          Preview
        </CardButton>
        <CardButton variant='contained' color='primary' size='small' onClick={handleStatus}>
          {status ? 'Unpublish' : 'Publish'}
        </CardButton>
        <CardButton variant='contained' color='primary' size='small' onClick={handleEdit}>
          Edit
        </CardButton>
      </ActionsWrapper>
    </CardWrapper>
  );
}

import React, { useState } from 'react';
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
import { updateFormStatus } from '../../http/restCalls';
import { copyToClipboard } from '../../utility';
import SnackbarFactory from '../snackbar/SnackbarFactory';

export default function Card({ data: { uuid, title = '', description, status }, loading }) {
  const history = useHistory();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleEdit = () => {
    history.push(`/edit?id=${uuid}`);
  };

  const handlePreview = () => {
    history.push(`/view?id=${uuid}`);
  };

  const handleLink = () => {
    copyToClipboard(window.location.href + `view?id=${uuid}`);
    setLinkCopied(true);
  };

  const handleStatus = async () => {
    try {
      await updateFormStatus(uuid, !currentStatus);
      setCurrentStatus(!currentStatus);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
              <StatusText status={currentStatus}>{currentStatus ? 'Live' : 'Offline'}</StatusText>
              {currentStatus && <LinkIcon style={{ cursor: 'pointer', marginLeft: 'auto' }} onClick={handleLink} />}
            </>
          )}
        </PropertiesWrapper>
        <ActionsWrapper>
          <CardButton
            variant='contained'
            color='primary'
            size='small'
            disabled={!currentStatus || loading}
            onClick={handlePreview}
          >
            Preview
          </CardButton>
          <CardButton variant='contained' color='primary' size='small' onClick={handleStatus} disabled={loading}>
            {currentStatus ? 'Unpublish' : 'Publish'}
          </CardButton>
          <CardButton variant='contained' color='primary' size='small' onClick={handleEdit} disabled={loading}>
            Edit
          </CardButton>
        </ActionsWrapper>
        {linkCopied && (
          <SnackbarFactory type='success' message='Link copied successfully' unmount={() => setLinkCopied(false)} />
        )}
      </CardWrapper>
    </>
  );
}

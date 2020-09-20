import React from 'react';
import { CardWrapper, ActionsWrapper, PropertiesWrapper, CardButton } from './CardStyles';
import LinkIcon from '@material-ui/icons/Link';

export default function Card({ data: { id, title = '', description, status, link } }) {
  return (
    <CardWrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundSize: 'contain',
          height: '15rem',
        }}
      >
        <img
          src='/images/form.svg'
          alt='form placeholder'
          style={{ width: '100%', maxHeight: '15rem', position: 'absolute' }}
        />
        <div
          style={{
            backgroundColor: 'black',
            opacity: 0.6,
            width: '100%',
            height: '100%',
            color: '#e9e9e9',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
          }}
        >
          <strong>{title.toUpperCase()}</strong>
        </div>
      </div>
      <PropertiesWrapper>
        <strong>Status:</strong>
        <p style={{ margin: '0 0 0 0.5rem', color: status ? '#297329' : 'red', fontWeight: 'bold' }}>
          {status ? 'Live' : 'Offline'}
        </p>
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

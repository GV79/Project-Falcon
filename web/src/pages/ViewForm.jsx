import React, { useEffect, useState } from 'react';
import { Button, FormControl, Grid, TextareaAutosize, TextField } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useHistory } from 'react-router-dom';
import { getFormById, getFormStatus, submitResponse } from '../http/restCalls';
import { FORM_TYPE } from '../constants';
import Signature from '../components/forms/Signature';
import { FieldWrapper, FieldLabel, HeaderWrapper, FormDescription, FormTitle } from './ViewFormStyles';
import SuccessfulSubmit from '../components/success/SuccessfulSubmit';
import MultipleChoice from '../components/forms/MultipleChoice';
import GenericError from '../components/error/GenericError';

export default function Viewform() {
  const [data, setData] = useState([]);
  const [signature, setSignature] = useState(null);
  const [answers, setAnswers] = useState([]); // format { fieldId: x, answer: y }
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const params = history.location.search;
    const id = params.split('=')[1];

    (async () => {
      const { data: form } = await getFormStatus(id);
      if (form.status) {
        const { data } = await getFormById(id);
        setData(data);
        setAnswers(
          data.fields.map((field) => {
            return { id: field.id, type: field.type, label: field.label, answer: '' };
          })
        );
      } else {
        setError(true);
      }
    })().catch((err) => {
      // setLoading(false);
      console.log(err);
    });
  }, [history.location.search]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await submitResponse(data.uuid, { answers, signature });
      setSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (id, value) => {
    setAnswers(
      answers.map((field) => {
        if (field.id === id) {
          return { id: field.id, answer: value, type: field.type, label: field.label };
        } else {
          return field;
        }
      })
    );
  };

  const handleMultipleChoice = (id, value) => {
    setAnswers(
      answers.map((field) => {
        if (field.id === id) {
          return { id: field.id, answer: value, type: field.type, label: field.label };
        } else {
          return field;
        }
      })
    );
  };

  const renderFieldByType = (field, key) => {
    switch (field.type) {
      case FORM_TYPE.SINGLE:
        return (
          <FieldWrapper container direction='column' key={key}>
            <FieldLabel htmlFor={field.label + key}>{field.label}</FieldLabel>
            <TextField
              name={field.label + key}
              variant='outlined'
              size='small'
              required
              style={{ minWidth: '15rem' }}
              onChange={(e) => handleInput(field.id, e.target.value)}
            />
          </FieldWrapper>
        );
      case FORM_TYPE.LONG:
        return (
          <FieldWrapper container direction='column' key={key} onChange={(e) => handleInput(field.id, e.target.value)}>
            <FieldLabel htmlFor={field.label + key}>{field.label}</FieldLabel>
            <TextareaAutosize
              aria-label='minimum height'
              name={field.label + key}
              rowsMin={4}
              style={{ minWidth: '15rem' }}
              required
            />
          </FieldWrapper>
        );
      default:
        return (
          <FormControl component='fieldset' style={{ marginBottom: '1rem' }} key={key}>
            <FieldLabel>{field.label}</FieldLabel>
            <Grid container>
              <MultipleChoice field={field} handleMultipleChoice={handleMultipleChoice} />
            </Grid>
          </FormControl>
        );
    }
  };

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      direction='column'
      style={{ padding: '3rem', flexWrap: 'nowrap' }}
    >
      {error ? (
        <GenericError message='This form is no longer live' />
      ) : (
        <>
          <HeaderWrapper container justify='center' alignItems='center' direction='column'>
            <FormTitle>{data.title}</FormTitle>
            <FormDescription>{data.description}</FormDescription>
          </HeaderWrapper>
          {submitted ? (
            <SuccessfulSubmit />
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid container direction='column'>
                {data?.fields?.map((field, index) => {
                  return renderFieldByType(field, index);
                })}
                <Signature setSignature={setSignature} />
                <Button variant='contained' color='primary' startIcon={<ArrowUpwardIcon />} size='medium' type='submit'>
                  Submit Form
                </Button>
              </Grid>
            </form>
          )}
        </>
      )}
    </Grid>
  );
}

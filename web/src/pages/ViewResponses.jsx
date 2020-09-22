import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getResponses } from '../http/restCalls';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ViewResponses() {
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    const params = history.location.search;
    const id = params.split('=')[1];

    (async () => {
      const { data } = await getResponses(id);
      console.log(data);
      setData(data);
    })().catch((err) => {
      // setLoading(false);
      console.log(err);
    });
  }, [history.location.search]);

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      direction='column'
      style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#e8e8e8' }}
    >
      <h1 style={{ color: '#555' }}>Form Responses</h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', maxWidth: '50rem' }}>
        {data.map((response, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <Typography>{'Response ' + (index + 1)}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ maxWidth: '40rem', width: '100%', flexDirection: 'column' }}>
                {response.answers.map((answer) => {
                  return (
                    <div style={{ padding: '1rem', margin: '1rem 4rem', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px' }}>
                      <p style={{ color: '#333', fontWeight: 'bold' }}>{answer.label}</p>
                      <p style={{ color: '#777' }}>
                        <strong>Answer:</strong> {answer.answer}
                      </p>
                      {/* <Typography style={{ color: '#666' }}>{answer.answer}</Typography> */}
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </Grid>
  );
}

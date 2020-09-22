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
      style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#e8e8e8' }}
    >
      <h1 style={{ color: '#555' }}>Form Responses</h1>
      {data.map((response, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <Typography>{'Response ' + (index + 1)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Grid>
  );
}

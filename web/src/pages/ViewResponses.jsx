import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getResponses } from '../http/restCalls';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';

const ResponsesWrapper = styled(Grid)`
  padding: 2rem;
  text-align: center;
  background-color: #e8e8e8;
`;

const Title = styled.h1`
  color: #555;
`;

const ResponseFieldAnswer = styled.p`
  color: #777;
`;

const ResponseFieldLabel = styled.p`
  color: #333;
  font-weight: bold;
`;

const ResponseField = styled.div`
  padding: 1rem;
  margin: 1rem 4rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px;
`;

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
    <ResponsesWrapper container justify='center' alignItems='center' direction='column'>
      <Title>Form Responses</Title>
      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', maxWidth: '50rem' }}>
        {data.map((response, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <Typography>{'Response ' + (index + 1)}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ maxWidth: '40rem', width: '100%', flexDirection: 'column' }}>
                {response.answers.map((answer, index) => {
                  return (
                    <ResponseField key={index}>
                      <ResponseFieldLabel>{answer.label}</ResponseFieldLabel>
                      <ResponseFieldAnswer>
                        <strong>Answer:</strong> {answer.answer}
                      </ResponseFieldAnswer>
                    </ResponseField>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </ResponsesWrapper>
  );
}

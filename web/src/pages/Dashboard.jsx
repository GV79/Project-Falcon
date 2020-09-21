import React, { useEffect, useState } from 'react';
import { Container } from './DashboardStyles';
import Card from '../components/forms/Card';
import AddForm from '../components/forms/AddForm';
import { getForms } from '../http/restCalls';

export default function Dashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getForms();
      setForms(data);
    })().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <Container>
      <AddForm />
      {forms.map((data) => (
        <Card data={data} key={data.id} />
      ))}
    </Container>
  );
}
